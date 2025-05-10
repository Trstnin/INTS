# Into StartUps 🚀

A modern platform connecting startup enthusiasts, providing resources, and facilitating learning in the startup ecosystem.

## ✨ Key Features

- Startup Community Discovery System
- Interactive Card Swiping Interface
- Real-time Group Management
- Custom Username Generation
- OAuth2 Authentication with Google
- Secure JWT-based Sessions
- Glass Morphism Design System
- Cross-platform Responsiveness

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite 5
- Tailwind CSS 3
- React Router 6
- Axios 1.x
- React Icons
- React Toastify
- Auth0 React SDK

### Backend
- Node.js 18+
- Express 4.x
- MongoDB 6.x
- Mongoose 7.x
- JSON Web Tokens
- OAuth2 
- Express Validator
- Nodemailer

### Additional Features
- React Tinder Card
- Material UI Components
- Custom Animation Effects
- Real-time Group Management
- Dynamic Card Swiping

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
├── Frontend/                
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomeComp/   # Home components
│   │   │   ├── Popup/      # Modal components
│   │   │   └── common/     # Shared components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # State management
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── Backend/              
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── models/         # Database models
    │   ├── routes/         # API routes
    │   └── utils/          # Utility functions
    └── server.js           # Entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.


