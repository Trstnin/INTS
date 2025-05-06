# Into Startups - Backend API

A robust backend service for the Into Startups platform, providing authentication, user management, and startup-related features.

## 🚀 Quick Start

1. Clone and install dependencies:
```bash
git clone https://github.com/Trstnin/INTS.git
cd INTS/Backend
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. Start development server:
```bash
npm run dev
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **Validation**: Express Validator
- **Middleware**: Cookie Parser, CORS
- **Development**: Nodemon

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}

Response: 201 Created
{
  "message": "User created successfully",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "string"
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
}
```

### Error Responses

```http
400 Bad Request
{
  "status": "error",
  "message": "Validation error",
  "errors": [...]
}

401 Unauthorized
{
  "status": "error",
  "message": "Invalid credentials"
}

404 Not Found
{
  "status": "error",
  "message": "Resource not found"
}

500 Internal Server Error
{
  "status": "error",
  "message": "Internal server error"
}
```

## 📁 Project Structure

```
Backend/
├── src/                  # Source files
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   ├── db/              # Database connection
│   └── app.js          # Express app setup
├── tests/               # Test files
├── server.js           # Server entry point
└── package.json        # Project manifest
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Request validation
- CORS protection
- Rate limiting
- Secure HTTP headers
- Input sanitization

## 🔧 Development

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm/yarn

### Environment Variables
```env
PORT=3000                    # Server port
MONGODB_URI=<uri>           # MongoDB connection string
JWT_SECRET=<secret>         # JWT token secret
NODE_ENV=development        # Environment
CORS_ORIGIN=*              # CORS allowed origins
```

### Commands
```bash
# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Check linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- users.test.js

# Run with coverage
npm run test:coverage
```

## 📈 Monitoring

The API includes basic monitoring endpoints:

```http
GET /health
Response: 200 OK
{
  "status": "healthy",
  "timestamp": "ISO-8601 date"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Support

For support, email dev@intostartups.com or join our Slack channel.

## 📚 Additional Resources

- [API Documentation](docs/api.md)
- [Contribution Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)
