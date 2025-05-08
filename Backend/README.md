# Into Startups - Backend 🔧

Secure and scalable backend service featuring OAuth2 authentication and JWT session management.

## ✨ Features

- Google OAuth2 Integration
- JWT Token Authentication
- Express Validator Implementation
- MongoDB with Mongoose
- Cookie-based Sessions
- CORS Configuration
- Secure Password Hashing

## 🛠️ Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose 8
- JWT for Authentication
- bcrypt for Password Hashing
- Express Validator
- Axios for OAuth2
- Cookie Parser

## 📁 Project Structure

```
src/
├── controllers/
│   ├── userController.js     # User auth logic
│   └── googleController.js   # OAuth handling
├── models/
│   └── userModel.js         # User schema
├── routes/
│   ├── appRouter.js         # Main router
│   └── authRouter.js        # Auth routes
├── utils/
│   └── validator.js         # Request validation
├── db/
│   └── connectDb.js         # Database connection
└── app.js                   # Express setup
```

## ⚡ Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# .env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SMTP_USER=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_LOGIN=your_smtp_login
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/v1/auth/google/callback
```

3. Start development server:
```bash
npm run dev
```

## 🔑 API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/google
GET  /api/v1/auth/google/callback
```

## 🔒 Security Features

- Password Hashing (bcrypt)
- JWT Session Management
- Request Validation
- CORS Protection
- Secure Cookie Handling
- OAuth2 Implementation

## 📊 Data Models

### User Schema
```javascript
{
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
  avatarUrl: String,
  googleId: String
}
```

## 🔧 Middleware

- Request Validation
- Authentication Check
- Error Handling
- CORS Configuration
- Body Parsing
- Cookie Parsing

## 📚 Available Scripts

```bash
npm run dev   # Start development server
npm start     # Start production server
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
