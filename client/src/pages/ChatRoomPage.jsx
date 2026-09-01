import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import { useParams } from 'react-router-dom';

import { io } from 'socket.io-client';

import {
  Send,
  Users
} from 'lucide-react';

import { Sidebar }
from '../components/layout/Sidebar';

import { Header }
from '../components/layout/Header';

const socket =
  io('http://localhost:5000');

const generateNickname = () => {

  const first = [
    'Shadow',
    'Dark',
    'Ghost',
    'Silent',
    'Broken',
    'Hidden',
    'Moon',
    'Lost'
  ];

  const second = [
    'Wolf',
    'Crow',
    'Fox',
    'Soul',
    'Tiger',
    'Storm',
    'Raven'
  ];

  return `${first[Math.floor(Math.random() * first.length)]}${second[Math.floor(Math.random() * second.length)]}${Math.floor(Math.random() * 999)}`;
};

const ChatRoomPage = () => {

  const { mood } =
    useParams();

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState('');

  const [onlineUsers, setOnlineUsers] =
    useState(0);

  const [typingUser, setTypingUser] =
    useState('');

  const [nickname] =
    useState(generateNickname());

  const messagesEndRef =
    useRef(null);

  const typingTimeoutRef =
    useRef(null);

  // ======================
  // AUTO SCROLL
  // ======================

  const scrollToBottom = () => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: 'smooth'
      });
  };

  useEffect(() => {

    scrollToBottom();

  }, [messages]);

  // ======================
  // SOCKET EVENTS
  // ======================

  useEffect(() => {

    // JOIN ROOM

    socket.emit(
      'join_room',
      mood
    );

    // OLD MESSAGES

    socket.on(
      'previous_messages',
      (data) => {

        setMessages(data);
      }
    );

    // NEW MESSAGE

    socket.on(
      'receive_message',
      (data) => {

        setMessages(prev => [
          ...prev,
          data
        ]);
      }
    );

    // ONLINE USERS

    socket.on(
      'online_users',
      (count) => {

        setOnlineUsers(count);
      }
    );

    // TYPING

    socket.on(
      'user_typing',
      (username) => {

        if (
          username === nickname
        ) return;

        setTypingUser(username);

        clearTimeout(
          typingTimeoutRef.current
        );

        typingTimeoutRef.current =
          setTimeout(() => {

            setTypingUser('');

          }, 1500);
      }
    );

    // CLEANUP

    return () => {

      socket.off(
        'previous_messages'
      );

      socket.off(
        'receive_message'
      );

      socket.off(
        'online_users'
      );

      socket.off(
        'user_typing'
      );
    };

  }, [mood, nickname]);

  // ======================
  // SEND MESSAGE
  // ======================

  const sendMessage = () => {

    if (!message.trim()) return;

    const newMessage = {

      room: mood,

      username: nickname,

      message,

      createdAt:
        new Date()
    };

    socket.emit(
      'send_message',
      newMessage
    );

    setMessage('');
  };

  // ======================
  // HANDLE INPUT
  // ======================

  const handleTyping = (e) => {

    setMessage(e.target.value);

    socket.emit(
      'typing',
      {
        room: mood,
        username: nickname
      }
    );
  };

  // ======================
  // TIME FORMAT
  // ======================

  const formatTime = (date) => {

    return new Date(date)
      .toLocaleTimeString([], {

        hour: '2-digit',

        minute: '2-digit'
      });
  };

  return (

    <div className="min-h-screen bg-[#070710]">

      <Sidebar />

      <Header />

      <main className="ml-64 pt-24 px-6">

        <div className="max-w-4xl mx-auto">

          {/* ROOM HEADER */}

          <div className="bg-[#121225] border border-white/10 rounded-2xl p-5 mb-5">

            <div className="flex items-center justify-between">

              <div>

                <h1 className="text-4xl font-bold text-white">

                  {mood} Room

                </h1>

                <p className="text-gray-400 mt-2">

                  Anonymous support room

                </p>

              </div>

              <div className="bg-purple-600/20 px-4 py-2 rounded-xl flex items-center gap-2">

                <Users className="w-5 h-5 text-purple-400" />

                <span className="text-white">

                  {onlineUsers} Online

                </span>

              </div>

            </div>

          </div>

          {/* CHAT BOX */}

          <div className="bg-[#121225] border border-white/10 rounded-2xl h-[70vh] flex flex-col overflow-hidden">

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto p-5 space-y-4">

              {messages.map(
                (msg, index) => (

                  <div
                    key={index}
                    className={`flex ${
                      msg.username === nickname
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >

                    <div className="bg-[#1d1d35] px-4 py-3 rounded-2xl max-w-[75%]">

                      <div className="flex items-center gap-3 mb-1">

                        <p className="text-purple-400 text-sm font-semibold">

                          {msg.username}

                        </p>

                        <p className="text-gray-500 text-xs">

                          {formatTime(
                            msg.createdAt
                          )}

                        </p>

                      </div>

                      <p className="text-white break-words">

                        {msg.message}

                      </p>

                    </div>

                  </div>

                )
              )}

              {/* TYPING */}

              {typingUser && (

                <p className="text-gray-400 italic text-sm">

                  {typingUser} is typing...

                </p>

              )}

              <div ref={messagesEndRef} />

            </div>

            {/* INPUT */}

            <div className="border-t border-white/10 p-4 flex gap-3">

              <input
                type="text"
                value={message}
                onChange={handleTyping}
                onKeyDown={(e) => {

                  if (
                    e.key === 'Enter'
                  ) {

                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 bg-[#1b1b33] text-white px-4 py-3 rounded-xl outline-none border border-white/10 focus:border-purple-500"
              />

              <button
                onClick={sendMessage}
                className="bg-purple-600 hover:bg-purple-700 px-5 rounded-xl flex items-center justify-center"
              >

                <Send className="w-5 h-5 text-white" />

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default ChatRoomPage;