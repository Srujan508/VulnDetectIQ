# CyberShield - Local Development Setup

## Prerequisites

Make sure you have these installed on your computer:

- **Node.js** (version 18 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)

## Quick Setup

1. **Clone or download** this project to your computer

2. **Open terminal/command prompt** and navigate to the project folder:
   ```bash
   cd path/to/cybershield-project
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to:
   ```
   http://localhost:5000
   ```

## What You'll See

The application will start with:
- ✅ Backend server running on port 5000
- ✅ Frontend served through the same port
- ✅ Hot-reload enabled (changes reflect automatically)

## Login Credentials

Since this is a demo application, you can use any email/password combination to log in as either:
- **Admin** - Full security dashboard access
- **Customer** - Enterprise client portal view

## Troubleshooting

### Port Already in Use
If port 5000 is busy, the app will show an error. Kill any other processes using that port:

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
If you get dependency errors, try:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Browser Not Opening
Manually open your browser and navigate to `http://localhost:5000`

## Project Structure

```
cybershield/
├── client/          # Frontend React app
├── server/          # Backend Express server  
├── shared/          # Shared types/schemas
└── package.json     # Dependencies and scripts
```

The app is a full-stack React + Express application with cyberpunk styling and comprehensive security dashboard features.

## Development Notes

- The server automatically serves both API endpoints and the frontend
- All changes to React components hot-reload instantly
- Server changes require restart (Ctrl+C then `npm run dev` again)
- The app uses in-memory storage (data resets on restart)

Happy coding! 🚀