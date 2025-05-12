# Into Startups - Backend 🔧

Feature-rich backend service with real-time messaging, OAuth2 authentication, and comprehensive startup management system.

## ✨ Features

- Real-time Chat System with Socket.IO
- Google OAuth2 Integration
- Group Management System
- Startup Communities
- JWT Token Authentication
- Preference Name System
- Email Notifications
- Secure Sessions

## 🛠️ Tech Stack

- Node.js 18+
- Express 5.x
- MongoDB 6.x
- Socket.IO 4.x
- JWT for Authentication
- Bcrypt for Encryption
- Express Validator
- Nodemailer
- Cookie Parser
- Morgan Logger

## 📁 Project Structure

```
src/
├── controllers/
│   ├── userController.js      # User authentication & profile
│   ├── googleController.js    # OAuth2 integration
│   ├── messageController.js   # Real-time messaging
│   ├── joinedGroupController.js # Group management
│   └── groupController.js     # Startup groups
├── models/
│   ├── userModel.js          # User schema
│   ├── messageModel.js       # Chat messages
│   ├── groupModel.js         # Startup groups
│   ├── blacklistModel.js     # Token blacklist
│   ├── joinedGroupModel.js   # Group memberships
│   └── preferenceNameModel.js # User preferences
├── routes/
│   ├── appRouter.js          # Main router
│   ├── authRouter.js         # Authentication
│   ├── messageRouter.js      # Chat routes
│   └── groupRouter.js        # Group management
├── utils/
│   ├── validator.js          # Request validation
│   └── nodemailer.js         # Email service
├── middlewares/
│   └── authMiddleware.js     # JWT verification
└── app.js                    # Server setup
```

## 🔑 API Endpoints Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```
Request:
```json
{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john@example.com",
  "Password": "password123"
}
```
Success Response (200):
```json
{
  "success": true
}
```
Error Responses:
- 400: Invalid data / User exists
- 500: Server error during registration

#### Login User
```http
POST /auth/login
```
Request:
```json
{
  "Email": "john@example.com",
  "Password": "password123"
}
```
Success Response (200):
```json
{
  "success": true,
  "token": "jwt_token_here"
}
```
Error Responses:
- 400: Invalid email/password
- 500: Server error during login

### Group Management Endpoints

#### Join Group
```http
POST /group/join-group
```
Request:
```json
{
  "user": "user_id",
  "group": "group_id"
}
```
Success Response (201):
```json
{
  "message": "Group joined successfully"
}
```
Error Responses:
- 400: Already joined group
- 404: Group not found
- 500: Error joining group

#### Get Joined Groups
```http
GET /group/join-group?userId=user_id
```
Success Response (200):
```json
[
  {
    "group": "group_id",
    "name": "group_name"
  }
]
```
Error Responses:
- 400: userId required
- 500: Failed to fetch groups

### Messaging Endpoints

#### Send Message
```http
POST /message
```
Request:
```json
{
  "group": "group_id",
  "sender": "user_id",
  "text": "message content"
}
```
Success Response (201):
```json
{
  "_id": "message_id",
  "text": "message content",
  "createdAt": "timestamp"
}
```
Error Responses:
- 400: Missing required fields
- 500: Failed to send message

#### Get Group Messages
```http
GET /message/:groupId
```
Success Response (200):
```json
[
  {
    "_id": "message_id",
    "sender": "user_id",
    "text": "message content",
    "createdAt": "timestamp"
  }
]
```
Error Responses:
- 404: Group not found
- 500: Failed to fetch messages

### Preference Name Endpoints

#### Set Preference Name
```http
POST /auth/preferenceName
```
Request:
```json
{
  "preferenceName": "custom_name"
}
```
Success Response (200):
```json
{
  "preferenceName": "custom_name"
}
```
Error Responses:
- 400: Preference name required
- 401: Unauthorized
- 500: Internal server error

#### Get Preference Name
```http
GET /auth/preferenceName
```
Success Response (200):
```json
{
  "preferenceName": "custom_name"
}
```
Error Responses:
- 401: Unauthorized
- 500: Internal server error

### Error Response Format
All error responses follow this structure:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error info (development only)"
}
```

## 🔌 WebSocket Events

```javascript
// Client Events
'connection'       // User connects
'join-room'       // Join chat room
'send-message'    // Send chat message
'disconnect'      // User disconnects

// Server Events
'receive-message' // New message received
'getOnlineUsers'  // Online users list
```

## 🔒 Security Features

- JWT Session Management
- Password Hashing (bcrypt)
- Token Blacklisting
- Request Validation
- CORS Protection
- Secure Cookies

## 🚀 Development

1. Install dependencies:
```bash
npm install
```

2. Environment setup:
```bash
# Required variables
PORT=3000
MONGODB_URI=mongodb://...
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
SMTP_CONFIG=...
```

3. Start server:
```bash
npm run dev     # Development
npm start       # Production
```

## 📚 Error Handling

- Input Validation
- JWT Verification
- Database Errors
- OAuth Failures
- Socket Events
