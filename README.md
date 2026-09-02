# ShadowRoom 👻

> An anonymous social platform for sharing thoughts, experiences, and support while maintaining user privacy.

## 📌 Overview

ShadowRoom is a full-stack anonymous social platform developed as a college-level project with a strong focus on web application security.

The project combines modern web development with practical cybersecurity concepts such as authentication, authorization, password hashing, API security, input validation, CORS, secure configuration, and security testing.

The goal of the project is to provide users with a private space where they can express themselves anonymously while also serving as a practical environment for learning secure application development and web security testing.

## 🎯 Objectives

- Build a functional anonymous social platform.
- Implement user registration and authentication.
- Protect authenticated API endpoints.
- Store passwords securely using hashing.
- Provide anonymous posting and interaction.
- Implement real-time anonymous chat rooms.
- Provide an AI-powered chatbot.
- Add administrative controls for managing users and content.
- Deploy the application using cloud services.
- Apply cybersecurity concepts during development and testing.

## ✨ Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Password hashing using bcrypt
- Email verification
- Resend email verification
- Logout
- Authentication state management

### Anonymous Posts

- Create anonymous posts
- View all posts
- View individual posts
- Relate to posts
- Bookmark posts
- Report posts
- Delete posts
- View personal posts
- Administrative post deletion

### Comments

- Add comments
- View comments
- Delete comments
- Authentication-based comment operations

### Anonymous Chat Rooms

- Real-time communication using Socket.IO
- Room-based messaging
- Online user count
- Typing indicators
- Previous message loading
- Persistent room messages

### AI Chatbot

- AI-powered conversation
- Chatbot persona configuration
- Conversation reset

### Admin Panel

- View users
- Ban users
- Unban users
- Delete users
- View reported content
- Delete reported posts

## 🔐 Cybersecurity Perspective

Security is an important part of ShadowRoom because the project was developed as a practical learning environment for web application security.

The application focuses on understanding how security controls are implemented in a real-world full-stack application and how those controls can be tested from an attacker's perspective.

### Authentication and Authorization

The application uses JSON Web Tokens for authentication.

A simplified authentication flow is:

User → Frontend → Login API → Backend → Credential Validation → JWT Generation → Protected API Requests

Authenticated requests send the token using the Authorization header.

Example:

Authorization: Bearer <JWT>

The backend can then verify the token before allowing access to protected resources.

### Password Security

User passwords are not intended to be stored as plaintext.

The application uses bcryptjs for password hashing.

Password registration flow:

Plain Password → bcrypt Hashing → Password Hash → Database

Login flow:

Entered Password → bcrypt Comparison → Stored Password Hash → Authentication Result

### Input Validation

The backend uses express-validator to validate incoming data.

Validation is important for areas such as:

- Registration
- Login
- Posts
- Comments
- Reports
- Administrative operations

Input validation helps prevent malformed or unexpected data from reaching application logic.

### API Security

The frontend communicates with the backend through REST API endpoints.

Production architecture:

Browser → HTTPS → React Frontend → Express API → MongoDB Atlas

Authenticated API requests include the user's JWT when required.

### CORS

The backend uses CORS configuration to control allowed frontend origins.

The production frontend is configured as an allowed origin instead of allowing arbitrary browser origins.

### Environment Variables

Sensitive configuration such as database credentials, JWT secrets, email credentials, and API keys are stored in environment variables.

Environment files containing secrets are excluded from Git using .gitignore.

Sensitive credentials should never be committed to a public repository.

### Security Testing

As a cybersecurity-focused project, ShadowRoom can be tested using tools such as Burp Suite.

Security testing can include:

- Authentication testing
- Authorization testing
- IDOR testing
- Access control testing
- Input validation testing
- XSS testing
- Injection testing
- CORS testing
- JWT and session testing
- Rate-limit testing
- Business logic testing
- API security testing

A typical testing workflow is:

Reconnaissance → Application Mapping → Endpoint Discovery → Authentication Testing → Authorization Testing → Input Validation Testing → Session and Token Testing → Business Logic Testing → API Testing → Remediation

## 🏗️ Architecture

ShadowRoom follows a frontend, backend, and database architecture.

Browser
   ↓
React + Vite Frontend
   ↓
Vercel
   ↓
Node.js + Express Backend
   ↓
Render
   ↓
MongoDB Atlas

Real-time chat communication uses Socket.IO between the frontend and backend.

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS
- Tailwind CSS

### Backend

- Node.js
- Express.js
- REST APIs
- Socket.IO
- JSON Web Token
- bcryptjs
- Nodemailer
- express-validator

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### AI

- Google Generative AI

### Security and Testing

- Burp Suite
- OWASP security concepts
- API testing
- Authentication testing
- Authorization testing
- Input validation testing
- CORS testing

### Development

- Visual Studio Code
- Git
- GitHub
- npm

### Deployment

- Vercel
- Render
- MongoDB Atlas

## 📂 Project Structure

ShadowRoom/
│
├── client/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

## 🔄 API Overview

### Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

POST /api/auth/logout

GET /api/auth/verify-email/:token

POST /api/auth/resend-verification

### Posts

GET /api/posts

GET /api/posts/:id

POST /api/posts

POST /api/posts/:id/relate

DELETE /api/posts/:id

GET /api/posts/user/my-posts

POST /api/posts/:id/bookmark

POST /api/posts/:id/report

GET /api/posts/reported

DELETE /api/posts/admin/:id

### Comments

GET /api/comments/post/:postId

POST /api/comments

DELETE /api/comments/:commentId

### Categories

GET /api/categories

### Admin

GET /api/admin/users

PUT /api/admin/users/:userId/ban

PUT /api/admin/users/:userId/unban

DELETE /api/admin/users/:userId

### Health Check

GET /api/health

Example response:

{
  "status": "healthy",
  "database": "connected"
}

## 🚀 Run Locally

### Clone the repository

git clone https://github.com/SanjivaniDobhal/ShadowRoom.git

cd ShadowRoom

### Install frontend dependencies

cd client

npm install

### Install backend dependencies

cd ../server

npm install

### Configure environment variables

Create a file named .env inside the server directory.

Example configuration:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_app_password

GEMINI_API_KEY=your_gemini_api_key

Never commit real credentials to GitHub.

### Start the backend

From the server directory:

npm run dev

The backend will run on:

http://localhost:5000

Health check:

http://localhost:5000/api/health

### Start the frontend

Open another terminal:

cd client

npm run dev

The frontend will run on:

http://localhost:5173

## 🌍 Production Deployment

The production deployment uses:

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Production flow:

User Browser
   ↓
Vercel
   ↓
Render
   ↓
MongoDB Atlas

Frontend environment variables:

VITE_API_URL=https://your-backend-url

VITE_SOCKET_URL=https://your-backend-url

Production secrets are configured through the hosting platform and are not stored in the GitHub repository.

## 🧪 Security Testing Methodology

ShadowRoom can be used as a controlled environment for practicing web application security testing.

A security assessment can follow this process:

1. Reconnaissance
2. Application mapping
3. Endpoint discovery
4. Authentication testing
5. Authorization testing
6. Access control testing
7. Input validation testing
8. Session and token testing
9. API testing
10. Business logic testing
11. Security header and CORS testing
12. Vulnerability validation
13. Remediation
14. Retesting

Burp Suite can be used as a proxy between the browser and application:

Browser → Burp Suite → ShadowRoom API

This allows HTTP requests and responses to be inspected during authorized security testing.

## 📚 Cybersecurity Learning Outcomes

Building ShadowRoom helped develop practical understanding of:

- Web application architecture
- Authentication and authorization
- JWT-based authentication
- Password hashing
- REST API security
- CORS
- Input validation
- Access control
- Session and token security
- WebSocket security considerations
- Database security
- Environment variable management
- Secure deployment
- HTTP request and response analysis
- Security testing methodology
- Vulnerability identification and remediation

The project also provides a practical environment for applying concepts learned through web security labs and hands-on security testing.

## 🔮 Future Improvements

Planned security and functionality improvements include:

- Stronger rate limiting
- Security headers
- Improved session and token management
- More granular authorization
- WebSocket authentication and authorization
- Centralized security logging
- Abuse detection
- Automated security testing
- Dependency vulnerability scanning
- Improved content moderation
- Security monitoring and alerting
- Improved privacy controls

## ⚠️ Disclaimer

ShadowRoom is a college-level educational project.

The security controls in the application are continuously being improved and should not be considered a guarantee of complete production security.

Security testing should only be performed against systems for which permission has been obtained.

## 👩‍💻 Author

Sanjivani Dobhal

Cybersecurity Student | Web Application Security | Bug Bounty | VAPT

Areas of interest:

- Web Application Security
- Bug Bounty
- Vulnerability Assessment and Penetration Testing
- API Security
- Authentication and Authorization
- Security Research
- Secure Application Development

## 📜 License

This project is intended primarily for educational and learning purposes.
