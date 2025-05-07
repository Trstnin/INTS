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
# Add the following to .env:
PORT=3000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
NODE_ENV=development
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

## 📡 API Endpoints

### Authentication Routes (`/api/v1/auth`)

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "FirstName": "string",
  "LastName": "string",
  "Email": "string",
  "Password": "string",
  "avatarUrl": "string" (optional)
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "Email": "string",
  "Password": "string"
}
```

## 📁 Project Structure

```
Backend/
├── src/
│   ├── controllers/
│   │   └── userController.js    # User authentication logic
│   ├── models/
│   │   └── userModel.js        # User database schema
│   ├── routes/
│   │   ├── appRouter.js        # Main router
│   │   └── authRouter.js       # Auth routes
│   ├── utils/
│   │   └── validator.js        # Request validation
│   ├── db/
│   │   └── connectDb.js        # Database connection
│   └── app.js                  # Express app setup
└── server.js                   # Server entry point
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Request validation using express-validator
- CORS protection
- Secure cookie handling

## 🔧 Development

### Prerequisites
- Node.js
- MongoDB
- npm

### Environment Variables
```env
PORT=3000                    # Server port
MONGODB_URI=<uri>           # MongoDB connection string
JWT_SECRET=<secret>         # JWT token secret
NODE_ENV=development        # Environment
```

### Available Scripts
```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
