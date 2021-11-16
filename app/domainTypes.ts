export interface ICurrentUser {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  username: string
  pictureUrl?: string
  authProvider: AuthProviderFlags
  role: RoleEnum
  googleEmail?: string
  isAdmin: boolean
  isPremium: boolean
}

export interface IUserDetail {
  id: string
  firstName: string
  lastName: string
  fullName: string
  username: string
  pictureUrl?: string
  bio?: string
  numberOfFriends: number
  friendStatus: FriendStatus
}

export interface IUserDto {
  id: string
  username: string
  pictureUrl: string
  firstName: string
  lastName: string
  fullName: string
}

export interface IEventDto {
  id: string
  name: string
  bannerUrl: string
  startDate: string
  endDate: string
  accessibilityType: AccessibilityTypeEnum
  location?: string
  externalLink?: string
  isCurrentUserAttending: boolean
}

export enum AuthProviderFlags {
  Google = 1,
  EmailAndPassword = 2,
  Facebook = 4
}

export enum RoleEnum {
  BasicUser = 1,
  PremiumUser = 2,
  Admin = 3
}

export enum AccessibilityTypeEnum {
  Public = 0,
  Private = 1,
  FriendsOnly = 2
}

export enum FriendStatus {
  None = 0,
  Friend = 1,
  FriendRequestSent = 2,
  FriendRequestRecieved = 3
}
