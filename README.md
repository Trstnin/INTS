# Into StartUps 🚀

A comprehensive platform for startup discovery, community engagement, and idea validation with real-time features.

## ✨ Core Features

### 1. Community System
- Interactive Tinder-style startup discovery
- Real-time group chat functionality
- Dynamic community management
- Startup details and analytics

### 2. Authentication & Security
- Google OAuth2 integration
- JWT token management
- Secure session handling
- Custom preference names

### 3. Real-time Features
- Live messaging system
- Group chat rooms
- Online user status
- Message notifications

### 4. AI Integration
- Startup idea validation
- Real-time AI feedback
- Professional analysis
- Interactive chat interface

## 🛠️ Technology Stack

### Frontend
```json
{
  "core": {
    "react": "^18.0.0",
    "vite": "^5.0.0",
    "material-ui": "^7.1.0",
    "socket.io-client": "^4.8.1"
  },
  "features": {
    "react-tinder-card": "^1.6.4",
    "react-toastify": "^11.0.5",
    "axios": "^1.9.0",
    "react-spring": "^9.7.5"
  }
}
```

### Backend
```json
{
  "core": {
    "node": "^18.0.0",
    "express": "^5.1.0",
    "mongodb": "^6.0.0",
    "socket.io": "^4.8.1"
  },
  "security": {
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "express-validator": "^7.2.1"
  },
  "features": {
    "nodemailer": "^7.0.2",
    "cookie-parser": "^1.4.7",
    "morgan": "^1.10.0"
  }
}
```

## 📁 Project Architecture
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


