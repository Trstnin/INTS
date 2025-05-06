# Into Startups - Backend API

The backend implementation for the Into Startups platform built with Node.js, Express, and MongoDB.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Express Validator
- Cookie Parser
- CORS

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create .env file with required variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start development server:
```bash
npm run dev
```

## 📡 API Endpoints

### Authentication Routes
Base URL: `/api/v1/auth`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|-----------|
| POST | `/signup` | Register new user | `{ firstName, lastName, email, password }` | `{ message, user }` |
| POST | `/login` | Login user | `{ email, password }` | `{ message, token }` |
| POST | `/logout` | Logout user | - | `{ message }` |
| GET | `/profile` | Get user profile | - | `{ user }` |

### User Routes
Base URL: `/api/v1/users`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|-----------|
| GET | `/` | Get all users | - | `{ users }` |
| GET | `/:id` | Get user by ID | - | `{ user }` |
| PUT | `/:id` | Update user | `{ firstName, lastName, email }` | `{ message, user }` |
| DELETE | `/:id` | Delete user | - | `{ message }` |

## 🔒 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## 🧪 Error Handling

The API returns error responses in the following format:

```json
{
  "status": "error",
  "message": "Error message description",
  "code": 400
}
```

## 📁 Project Structure

```
Backend/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── appRouter.js
│   │   └── authRouter.js
│   ├── db/
│   │   └── connectDb.js
│   ├── middleware/
│   │   └── auth.js
│   └── app.js
├── server.js
└── package.json
```

## 🛡️ Security

- Passwords are hashed using bcrypt
- JWT tokens for session management
- CORS enabled for specific origins
- Request validation using express-validator
- Protected routes using authentication middleware

## 🔧 Development

1. Use nodemon for development:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
```

3. Start production server:
```bash
npm start
```

## 📝 Environment Variables

Required environment variables:

```env
PORT=3000                    # Server port
MONGODB_URI=<uri>           # MongoDB connection string
JWT_SECRET=<secret>         # JWT signing secret
NODE_ENV=development        # Environment (development/production)
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request
