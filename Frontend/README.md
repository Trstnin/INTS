# Into Startups - Frontend 🎨

A feature-rich React application for discovering and joining startup communities.

## ✨ Core Features

### 1. Authentication System
- Google OAuth2 integration
- JWT token management
- Protected routes with auth middleware
- Custom preference name setup

### 2. Community Features
- Tinder-style card swiping for startups
- Real-time chat functionality
- Join/Leave startup groups
- Community group management

### 3. Key Pages
- Landing page with feedback carousel
- Home page with interactive cards
- Chat interface for group discussions
- Detailed startup information pages
- AI-powered startup idea validation

### 4. Components Structure

```
src/
├── components/
│   ├── ChatComp/                 # Chat functionality
│   │   ├── ChattingInterface.jsx # Real-time messaging
│   │   ├── NavBarChat.jsx       # Chat navigation
│   │   └── DefaultTextComp.jsx  # Default chat view
│   │
│   ├── DetailsComp/             # Startup details
│   │   ├── Details.jsx          # Startup information
│   │   ├── NavBarDetails.jsx    # Details navigation
│   │   └── CommunitySectionDetails.jsx # Group management
│   │
│   ├── HomeComp/                # Main dashboard
│   │   ├── ScrollableCard.jsx   # Card swiping
│   │   ├── CommunitiesSection.jsx # Startup groups
│   │   ├── Navbar.jsx           # Main navigation
│   │   ├── ProfileDropdown.jsx  # User menu
│   │   └── ValidateIdeaBtn.jsx  # AI validation
│   │
│   ├── LandingComp/             # Landing page
│   │   ├── Feedback.jsx         # User testimonials
│   │   ├── Footer.jsx           # Site footer
│   │   └── Hero.jsx            # Hero section
│   │
│   ├── IdeaComp/               # Idea validation
│   │   └── NavBarIdea.jsx      # Idea nav
│   │
│   └── Popup/                  # Modal components
│       ├── PopupLogout.jsx     # Logout confirmation
│       └── PopupPreferenceName.jsx # Name setup

├── pages/                      # Main pages
│   ├── Home.jsx               # Dashboard
│   ├── Chat.jsx              # Chat system
│   ├── DetailedPage.jsx      # Startup details
│   ├── ValidateIdea.jsx      # AI validation
│   ├── Landing.jsx           # Welcome page
│   ├── Login.jsx            # Registration
│   └── SignIn.jsx           # Login page

├── contexts/                  # State management
│   ├── GroupContext.jsx      # Startup data
│   └── userContext.jsx       # User state

└── utils/                    # Helpers
    └── socket.js            # WebSocket setup
```

### 5. Key Technologies Used

```json
{
  "dependencies": {
    "@mui/material": "^7.1.0",
    "@react-spring/web": "^9.7.5",
    "axios": "^1.9.0",
    "react-tinder-card": "^1.6.4",
    "react-toastify": "^11.0.5",
    "socket.io-client": "^4.8.1"
  }
}
```

### 6. Features in Detail

#### Home Dashboard
- Interactive startup card swiping
- Real-time group management
- Profile customization
- Navigation system

#### Chat System
- Real-time messaging
- Group chat functionality
- Online user status
- Message history

#### Startup Details
- Comprehensive startup information
- Dynamic group joining
- Interactive UI elements
- Responsive design

#### AI Validation
- Startup idea validation
- Real-time AI feedback
- Interactive chat interface
- Professional analysis

## 🚀 Development

1. Install dependencies:
```bash
npm install
```

2. Environment setup:
```bash
# Required in .env
VITE_BASE_URL=http://localhost:3000
```

3. Start development:
```bash
npm run dev
```

## 📱 User Interface

- Glass morphism design
- Responsive layouts
- Interactive animations
- Toast notifications
- Loading states
- Error handling
