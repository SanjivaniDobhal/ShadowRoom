const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();


// ======================
// ROUTES
// ======================

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const chatbotRoutes = require('./routes/chatbot');
const commentRoutes = require('./routes/comments');
const categoryRoutes = require('./routes/categories');
const adminRoutes = require('./routes/admin');


// ======================
// MODELS
// ======================

const RoomMessage = require('./models/RoomMessage');


// ======================
// EXPRESS APP
// ======================

const app = express();

const server = http.createServer(app);


// ======================
// ALLOWED FRONTEND ORIGINS
// ======================

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://shadow-room-iota.vercel.app'
];


// ======================
// CORS CONFIGURATION
// ======================

const corsOptions = {

  origin: function (origin, callback) {

    // Allow requests without origin
    // Example: Postman, curl, server-to-server
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log(
      '❌ CORS blocked origin:',
      origin
    );

    return callback(
      new Error('Not allowed by CORS')
    );
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ]
};


// ======================
// SOCKET.IO
// ======================

const io = new Server(server, {

  cors: {

    origin: allowedOrigins,

    methods: [
      'GET',
      'POST'
    ],

    credentials: true
  }
});


// ======================
// MIDDLEWARE
// ======================

// CORS
app.use(cors(corsOptions));

// JSON body
app.use(express.json());

// URL encoded body
app.use(
  express.urlencoded({
    extended: true
  })
);


// ======================
// DATABASE
// ======================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {

    console.log(
      '✅ MongoDB Connected'
    );

  })
  .catch((err) => {

    console.error(
      '❌ MongoDB connection error:',
      err.message
    );

    process.exit(1);
  });


// ======================
// SOCKET ROOM USERS
// ======================

const roomUsers = {};


// ======================
// SOCKET.IO CONNECTION
// ======================

io.on(
  'connection',
  (socket) => {

    console.log(
      '⚡ User connected:',
      socket.id
    );


    // ======================
    // JOIN ROOM
    // ======================

    socket.on(
      'join_room',
      async (room) => {

        try {

          socket.join(room);

          socket.room = room;

          console.log(
            `${socket.id} joined ${room}`
          );


          // ======================
          // TRACK USERS
          // ======================

          if (!roomUsers[room]) {

            roomUsers[room] = [];
          }

          roomUsers[room].push(
            socket.id
          );


          // Send online user count
          io.to(room).emit(
            'online_users',
            roomUsers[room].length
          );


          // ======================
          // LOAD OLD MESSAGES
          // ======================

          const messages =
            await RoomMessage
              .find({
                room
              })
              .sort({
                createdAt: 1
              })
              .limit(50);


          socket.emit(
            'previous_messages',
            messages
          );

        } catch (error) {

          console.error(
            '❌ Join room error:',
            error.message
          );
        }
      }
    );


    // ======================
    // TYPING
    // ======================

    socket.on(
      'typing',
      (data) => {

        if (!data || !data.room) {
          return;
        }

        socket
          .to(data.room)
          .emit(
            'user_typing',
            data.username
          );
      }
    );


    // ======================
    // SEND MESSAGE
    // ======================

    socket.on(
      'send_message',
      async (data) => {

        try {

          if (
            !data ||
            !data.room ||
            !data.message
          ) {

            return;
          }


          const newMessage =
            await RoomMessage.create({

              room:
                data.room,

              username:
                data.username,

              message:
                data.message,

              userId:
                data.userId || null
            });


          io
            .to(data.room)
            .emit(
              'receive_message',
              newMessage
            );

        } catch (error) {

          console.error(
            '❌ Send message error:',
            error.message
          );
        }
      }
    );


    // ======================
    // DISCONNECT
    // ======================

    socket.on(
      'disconnect',
      () => {

        const room =
          socket.room;


        if (
          room &&
          roomUsers[room]
        ) {

          roomUsers[room] =
            roomUsers[room].filter(
              (id) =>
                id !== socket.id
            );


          io
            .to(room)
            .emit(
              'online_users',
              roomUsers[room].length
            );


          // Remove empty room
          if (
            roomUsers[room].length === 0
          ) {

            delete roomUsers[room];
          }
        }


        console.log(
          '❌ User disconnected:',
          socket.id
        );
      }
    );
  }
);


// ======================
// API ROUTES
// ======================

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/posts',
  postRoutes
);

app.use(
  '/api/chatbot',
  chatbotRoutes
);

app.use(
  '/api/comments',
  commentRoutes
);

app.use(
  '/api/categories',
  categoryRoutes
);

app.use(
  '/api/admin',
  adminRoutes
);


// ======================
// HEALTH CHECK
// ======================

app.get(
  '/api/health',
  (req, res) => {

    res.status(200).json({

      status: 'healthy',

      timestamp:
        new Date().toISOString(),

      database:
        mongoose.connection.readyState === 1
          ? 'connected'
          : 'disconnected'
    });
  }
);


// ======================
// ROOT ROUTE
// ======================

app.get(
  '/',
  (req, res) => {

    res.json({
      success: true,
      message: 'ShadowRoom API is running'
    });
  }
);


// ======================
// 404 HANDLER
// ======================

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      error: 'Route not found',

      message:
        `Cannot ${req.method} ${req.originalUrl}`
    });
  }
);


// ======================
// ERROR HANDLER
// ======================

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(
      '❌ Server Error:',
      err.message
    );


    res.status(500).json({

      success: false,

      error:
        err.message ||
        'Internal server error'
    });
  }
);


// ======================
// START SERVER
// ======================

const PORT =
  process.env.PORT || 5000;


server.listen(
  PORT,
  '0.0.0.0',
  () => {

    console.log(
      '================================='
    );

    console.log(
      `🚀 Server running on port ${PORT}`
    );

    console.log(
      `📍 Health: http://localhost:${PORT}/api/health`
    );

    console.log(
      '================================='
    );
  }
);