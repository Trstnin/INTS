# Into StartUps 🚀

A modern platform connecting startup enthusiasts, providing resources, and facilitating learning in the startup ecosystem.

## ✨ Key Features

- OAuth2 Authentication with Google
- Interactive Landing Page
- User Profile Management
- Secure JWT-based Sessions
- Modern UI with Glass Morphism Design
- Responsive Cross-platform Experience

## 🛠️ Technology Stack

### Frontend
- React 19 with Vite
- Tailwind CSS for styling
- React Router v7 for navigation
- Axios for API communication
- Glass morphism UI design

### Backend
- Node.js with Express 5
- MongoDB with Mongoose
- JWT for authentication
- OAuth2 for Google login
- Express Validator for data validation

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/INTS.git
cd INTS
```

2. Set up environment variables:
```bash
# Frontend (.env)
VITE_BASE_URL=http://localhost:3000/api/v1

# Backend (.env)
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/v1/auth/google/callback
```

3. Start the backend:
```bash
cd Backend
npm install
npm run dev
```

4. Start the frontend:
```bash
cd Frontend
npm install
npm run dev
```

## 📁 Project Structure
```
INTS/
├── Frontend/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
└── Backend/               # Node.js backend
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   └── utils/         # Utility functions
    └── server.js          # Entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.


