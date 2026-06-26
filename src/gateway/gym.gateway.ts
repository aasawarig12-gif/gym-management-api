import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GymGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor() {
    console.log('🔥 GymGateway Initialized');
  }

  afterInit(server: Server) {
    console.log('🚀 Socket server initialized');
  }

  handleConnection(client: Socket) {
    console.log('✅ Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('❌ Client disconnected:', client.id);
  }

  // 🔥 THIS IS THE ONLY HANDLER YOU NEED
 @SubscribeMessage('sendMessage')
handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
  console.log('🔥 EVENT HIT (sendMessage WORKING)');
  console.log('📦 DATA RECEIVED:', data);

  client.emit('receiveMessage', {
    message: 'SERVER GOT: ' + JSON.stringify(data),
  });
}
}