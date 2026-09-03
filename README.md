# ShadowRoom – Anonymous Social Platform

An anonymous social platform for sharing thoughts, experiences, and support while maintaining user privacy.

---

## Overview

ShadowRoom is a full-stack anonymous social platform developed as a college-level project with focus on web application security. It combines modern web development with cybersecurity concepts including authentication, authorization, password hashing, API security, input validation, CORS, and security testing.

The platform provides users with a private space for anonymous expression while serving as a practical environment for learning secure application development.

---

## Features

**User Authentication**
- Registration and login with JWT
- Password hashing using bcrypt
- Email verification
- Protected API routes

**Anonymous Posts**
- Create, view, and delete posts
- Relate to and bookmark posts
- Report inappropriate content
- Administrative post management

**Comments**
- Add, view, and delete comments
- Authentication-based operations

**Real-time Chat**
- Socket.IO based messaging
- Room-based communication
- Online user count
- Typing indicators
- Persistent messages

**AI Chatbot**
- AI-powered conversations
- Configurable persona
- Conversation reset

**Admin Panel**
- User management (view, ban, unban, delete)
- Content moderation (view and delete reported posts)

---

## Security Implementation

**Authentication & Authorization**
- JWT-based authentication
- Protected API endpoints with token verification
- Authorization: Bearer token header

**Password Security**
- bcryptjs for hashing
- No plaintext password storage

**Input Validation**
- express-validator for data validation
- Applied to registration, login, posts, comments, reports, admin operations

**API Security**
- REST API architecture
- HTTPS in production
- CORS configured for specific origins

**Environment Security**
- Sensitive data in environment variables
- .gitignore excludes environment files

**Security Testing**
- Burp Suite integration
- Testing: Authentication, authorization, IDOR, XSS, injection, CORS, JWT, rate-limiting, business logic, API security

---

## Technology Stack

**Frontend**
- React, Vite, Tailwind CSS

**Backend**
- Node.js, Express.js, Socket.IO
- JWT, bcryptjs, Nodemailer, express-validator

**Database**
- MongoDB, MongoDB Atlas, Mongoose

**AI**
- Google Generative AI

**Deployment**
- Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

**Security Testing**
- Burp Suite, OWASP concepts

---

## Architecture

```
Browser → React Frontend → Express Backend → MongoDB Atlas
                           ↓
                    Socket.IO (Real-time Chat)
```

---

## API Endpoints

**Authentication**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout
- GET /api/auth/verify-email/:token
- POST /api/auth/resend-verification

**Posts**
- GET /api/posts
- GET /api/posts/:id
- POST /api/posts
- DELETE /api/posts/:id
- POST /api/posts/:id/relate
- POST /api/posts/:id/bookmark
- POST /api/posts/:id/report
- GET /api/posts/user/my-posts
- GET /api/posts/reported
- DELETE /api/posts/admin/:id

**Comments**
- GET /api/comments/post/:postId
- POST /api/comments
- DELETE /api/comments/:commentId

**Admin**
- GET /api/admin/users
- PUT /api/admin/users/:userId/ban
- PUT /api/admin/users/:userId/unban
- DELETE /api/admin/users/:userId

**Health Check**
- GET /api/health

---

## Project Structure

```
ShadowRoom/
├── client/          # React frontend
│   ├── src/
│   └── package.json
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## Installation

**Prerequisites:** Node.js, npm, MongoDB account

```bash
# Clone repository
git clone https://github.com/SanjivaniDobhal/ShadowRoom.git
cd ShadowRoom

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Create .env file in server directory
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
GEMINI_API_KEY=your_gemini_api_key

# Start backend
npm run dev

# Start frontend (new terminal)
cd client
npm run dev
```

**Access:** Frontend at `http://localhost:5173`, Backend at `http://localhost:5000`

---

## Production Deployment

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

**Environment Variables:** VITE_API_URL, VITE_SOCKET_URL

---

## Security Testing Workflow

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
11. Vulnerability validation
12. Remediation and retesting

**Burp Suite:** Browser → Burp Suite → ShadowRoom API

---

## Learning Outcomes

- Web application architecture
- Authentication and authorization
- JWT-based authentication
- Password hashing
- REST API security
- CORS configuration
- Input validation
- Access control
- Session and token security
- WebSocket security
- Database security
- Secure deployment
- Security testing methodology
- Vulnerability identification and remediation

---

## Future Improvements

- Rate limiting and security headers
- Improved session management
- WebSocket authentication
- Centralized logging
- Automated security testing
- Dependency vulnerability scanning
- Enhanced content moderation
- Security monitoring

---

## Disclaimer

ShadowRoom is a college-level educational project. Security controls are continuously being improved. Security testing should only be performed with proper authorization.

---

## Author

**Sanjivani Dobhal**
Cybersecurity Student | Web Application Security | Bug Bounty | VAPT

**Interests:** Web Application Security, Bug Bounty, VAPT, API Security, Authentication and Authorization, Security Research, Secure Application Development

---

## License

Educational and learning purposes only.
