import {
  AuthService,
  AuthUserDto,
  ChatService,
  CommunicationEvent,
  ICommunicationRepository,
  ListMessagesDto,
  NewMessageDto,
} from '@/domain'
import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: true })
export class CommunicationRepository
  implements OnGatewayConnection, OnGatewayDisconnect, ICommunicationRepository
{
  @WebSocketServer() server!: Server

  private logger = new Logger(CommunicationRepository.name)

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
  ) {}

  async handleConnection(client: Socket) {
    this.logger.log(`New websocket connection: ${client.id}`)

    const user = await this.validateSocketClient(client)

    if (user) {
      client.join(user.id)
    }
  }

  handleDisconnect(client: Socket) {
    client.leave(client.nsp.name)
    this.logger.log(`Client ${client.id} disconnected from Websocket`)
  }

  send(event: CommunicationEvent, userId: string, data: any) {
    this.server.to(userId).emit(event, JSON.stringify(data))
  }

  broadcast(event: CommunicationEvent, data: any) {
    this.server.emit(event, data)
  }

  @SubscribeMessage(CommunicationEvent.SendMessage)
  async onNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: NewMessageDto,
  ) {
    const user = await this.validateSocketClient(client)

    if (user) {
      // TODO: validate body

      await this.chatService.sendNewMessage(user, body)
    }
  }

  @SubscribeMessage(CommunicationEvent.ListMessages)
  async onListMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: ListMessagesDto,
  ) {
    const user = await this.validateSocketClient(client)

    if (user) {
      // TODO: validate body

      await this.chatService.sendListMessages(user, body)
    }
  }

  private async validateSocketClient(
    client: Socket,
  ): Promise<AuthUserDto | void> {
    try {
      const user = await this.authService.validate(client.request.headers)
      if (user) {
        return user
      }

      client.emit('error', 'unauthorized')
      client.disconnect()
    } catch (e) {
      client.emit('error', 'unauthorized')
      client.disconnect()
    }
  }
}
