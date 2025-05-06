# Into Startups - Frontend

The frontend implementation of the Into Startups platform built with React and Tailwind CSS.

## 🛠️ Tech Stack

- React.js
- Tailwind CSS
- React Router DOM
- Preline UI Components
- Vite
- Jest & React Testing Library
- ESLint & Prettier
- Axios

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Main navigation component
│   │   ├── common/            # Reusable components
│   │   └── layouts/           # Layout components
│   ├── pages/
│   │   ├── Login/             # Login page components
│   │   └── Dashboard/         # Dashboard components
│   ├── assets/                # Images and static assets
│   ├── contexts/              # React context providers
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API service layers
│   ├── utils/               # Utility functions
│   └── tests/              # Test files
└── public/
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 🧪 Testing

1. Run unit tests:
   ```bash
   npm test
   ```

2. Run tests with coverage:
   ```bash
   npm run test:coverage
   ```

## 🎨 Features

### Components
- **Header**
  - Responsive navigation
  - Glass morphism design
  - Mobile-friendly menu
  - Authentication links
- **Common Components**
  - Button
  - Input
  - Card
  - Modal
  - Loading Spinner

### Pages
- Home
- Stories
- Reviews
- Learn
- Login/Register
- Dashboard
- Profile

## 📝 Development Guidelines

- Use Tailwind CSS for styling
- Follow component-based architecture
- Implement responsive design
- Maintain clean code practices

## 📤 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Preview production build:
   ```bash
   npm run preview
   ```

## 🔗 Environment Setup

Create a `.env` file in the root directory:
```
VITE_API_URL=your_api_url_here
VITE_GOOGLE_ANALYTICS_ID=your_ga_id_here
VITE_APP_ENV=development
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📜 Scripts

```json
{
  "dev": "Start development server",
  "build": "Build for production",
  "preview": "Preview production build",
  "test": "Run tests",
  "lint": "Run ESLint",
  "format": "Format code with Prettier"
}
```
