import { Server } from 'socket.io';
import http from 'http';

// declaring socket in request
declare global {
    namespace Express {
      interface Request {
        sockIO?: Promise<Server>;
      }
    }
  }
export class Socket {
    private server: http.Server
    constructor(server: http.Server) {
        this.server = server
    }
    public async init() {
        // Initialize a Socket.IO server
        const io = new Server(this.server, {
            cors: {
                origin: "*", // Allow requests from any origin (or specify the URL of your client)
                methods: ["GET", "POST"],
            },
        });
        // Handle new WebSocket connections
        io.on('connection', (socket) => {
            console.log('A client connected:', socket.id);

            // Send a message to the client when they connect
            socket.emit('message', 'Welcome to the Socket.IO server!');

            // Listen for messages from the client
            socket.on('message', (message: string) => {
                console.log('Message from client:', message);

                // Broadcast the message to all connected clients
                io.emit('message', `Client ${socket.id} says: ${message}`);
            });

            // Handle client disconnection
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
        return io
    }
}