# Into Startups - Frontend 🎨

Modern React-based frontend for the Into Startups platform featuring OAuth2 authentication and glass morphism design.

## 🎯 Features

- Google OAuth2 Authentication
- Interactive Startup Card Swiping
- Real-time Community Management
- Dynamic Startup Suggestions
- Glass Morphism UI Design
- Custom Preference Name System
- JWT Token Management
- Real-time Notifications

## 🛠️ Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Axios 1.x
- React Icons
- React Toastify
- Auth0 React SDK

## 📁 Project Structure

```
src/
├── components/
│   ├── HomeComp/           # Home page components
│   │   ├── ScrollableCard.jsx    # Swipeable startup cards
│   │   ├── CommunitiesSection.jsx # Sidebar with startup groups
│   │   ├── Navbar.jsx      # Navigation header
│   │   └── ProfileDropdown.jsx   # User profile menu
│   ├── Popup/             # Modal components
│   │   ├── PopupPreferenceName.jsx
│   │   └── PopupLogout.jsx
│   └── common/            # Shared components
├── pages/
│   ├── Home.jsx          # Main dashboard
│   ├── Landing.jsx       # Landing page
│   ├── Login.jsx         # Registration page
│   └── SignIn.jsx        # Login page
├── contexts/
│   └── userContext.jsx   # User state management
└── utils/                # Utility functions
```

## ⚡ Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
# .env
VITE_BASE_URL=http://localhost:3000/api/v1
```

3. Start development server:
```bash
npm run dev
```

## 🔒 Authentication Flow

1. Traditional Login:
   - Email/Password validation
   - JWT token storage
   - Protected route redirection

2. Google OAuth:
   - Google sign-in button
   - OAuth callback handling
   - Automatic profile creation

## 🎨 UI Components

- Glass Morphism Headers
- Responsive Navigation
- Animated Feedback Carousel
- Form Components with Validation
- Loading States
- Error Handling UI

## 📚 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

## 🔧 Configuration

### Vite Config
- React plugin
- Tailwind CSS integration
- Environment variable handling

### ESLint
- React hooks rules
- React refresh
- Modern JavaScript features

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Cross-browser compatibility

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
