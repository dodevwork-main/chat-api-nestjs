export const ICommunicationRepository = 'ICommunicationRepository'

export enum CommunicationEvent {
  SendMessage = 'send_message',
  ReceiveMessage = 'receive_message',
  ListMessages = 'list_messages',
}

export interface ICommunicationRepository {
  send(event: CommunicationEvent, userId: string, data: any): void

  broadcast(event: CommunicationEvent, data: any): void
}
