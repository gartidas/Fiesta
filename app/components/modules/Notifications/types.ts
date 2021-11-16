export enum NotificationType {
  EventInvitationReply = 1,
  EventInvitationCreated = 2,
  EventAttendeeRemoved = 3,
  EventAttendeeLeft = 4,
  EventJoinRequestCreated = 5,
  EventJoinRequestReply = 6,
  FriendRequestReply = 7,
  FriendRemoved = 8,
  NewUserWelcome = 9
}

export interface INotification<TModel> {
  id: number
  seen: boolean
  createdAt: string
  type: NotificationType
  model: TModel
}
