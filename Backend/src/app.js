import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { getAllGroups } from './controllers/groupController.js';
import appRouter from './routes/appRouter.js';
import connectDb from './db/connectDb.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'https://ints-frontend.onrender.com' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/', appRouter);
app.get('/', getAllGroups);

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'https://ints-frontend.onrender.com',
    methods: ['GET', 'POST'],
  },
});

// Attach io to app
app.set('io', io);

// In-memory map
const userSocketMap = {};

// Auth check
function isAuthenticated(socket) {
  return socket.handshake.query.userId;
}

// Socket.IO events
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`User connected: ${userId} (${socket.id})`);

  if (userId && isAuthenticated(socket)) {
    userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      socket.emit('message', `Welcome to room ${roomId}`);
    });

    socket.on('send-message', ({ roomId, message }) => {
      const payload = {
        senderId: userId,
        text: message,
        timestamp: new Date().toISOString(),
      };
      io.to(roomId).emit('receive-message', payload);
    });

    socket.on('disconnect', () => {
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
      console.log(`User ${userId} disconnected`);
    });
  } else {
    console.log('Unauthorized connection attempt');
  }
});

    
// Start server after DB is connected
const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('DB Connection Error:', err));
