# Into Startups - Frontend 🎨

Modern React-based frontend for the Into Startups platform featuring OAuth2 authentication and glass morphism design.

## 🎯 Features

- Google OAuth2 Authentication
- Glass Morphism UI Design
- Responsive Layout
- Protected Routes
- Form Validation
- JWT Token Management
- Smooth Page Transitions

## 🛠️ Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- React Router DOM 7
- Axios for API requests 
- React Icons
- React Toastify
- Auth0 React SDK

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Main navigation
│   ├── Footer.jsx         # Site footer
│   ├── Feedback.jsx       # User testimonials
│   └── HeroSection.jsx    # Landing page hero
├── pages/
│   ├── Landing.jsx        # Home page
│   ├── Login.jsx          # Registration page
│   ├── SignIn.jsx         # Login page
│   └── OauthSuccess.jsx   # OAuth callback handler
├── utils/
│   └── ProtectedRoutes.jsx # Auth route wrapper
├── contexts/
│   └── userContext.jsx    # User state management
├── App.jsx               # Main app component
└── main.jsx             # Entry point
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
