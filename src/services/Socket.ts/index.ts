import { Server, Socket } from 'socket.io';
import MongoCRUD from "../../CRUD/mongo";
type EventPayload<T = any> = T;

// Define an example of possible event types and payloads
interface SocketEvents {
  'message': string;          // Payload for 'message' event
  'private_message': {        // Payload for 'private_message' event
    from: string;
    message: string;
  };
  'status_update': {          // Payload for 'status_update' event
    status: string;
  };
}

class SocketService {
  private io: Server;
  private mongo: MongoCRUD;

  constructor(io: Server) {
    this.io = io;
    this.mongo = new MongoCRUD()
  }

  // Generic function to emit an event to all connected clients
  public emitToAll<K extends keyof SocketEvents>(event: K, payload: EventPayload<SocketEvents[K]>) {
    this.io.emit(event, payload);
  }

  // Generic function to emit an event to a specific socket by its ID
  public emitToSocket<K extends keyof SocketEvents>(socketId: string, event: K, payload: EventPayload<SocketEvents[K]>) {
    this.io.to(socketId).emit(event, payload);
  }

  // Emit to all clients except the sender
  public emitToAllExceptSender<K extends keyof SocketEvents>(senderSocket: Socket, event: K, payload: EventPayload<SocketEvents[K]>) {
    senderSocket.broadcast.emit(event, payload);
  }

  // Emit to a specific room (useful for rooms or namespaces)
  public emitToRoom<K extends keyof SocketEvents>(room: string, event: K, payload: EventPayload<SocketEvents[K]>) {
    this.io.to(room).emit(event, payload);
  }
}
