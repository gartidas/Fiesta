import { ArrowDropDown, HowToRegRounded, PersonAdd, Send, Telegram } from '@material-ui/icons'
import { FriendStatus } from 'domainTypes'

export const friendStatusStartIconMap = {
  [FriendStatus.None]: undefined,
  [FriendStatus.Friend]: <HowToRegRounded />,
  [FriendStatus.FriendRequestSent]: <Send />,
  [FriendStatus.FriendRequestRecieved]: <Telegram />
}

export const friendStatusEndIconMap = {
  [FriendStatus.None]: <PersonAdd />,
  [FriendStatus.Friend]: <ArrowDropDown />,
  [FriendStatus.FriendRequestSent]: <ArrowDropDown />,
  [FriendStatus.FriendRequestRecieved]: <ArrowDropDown />
}

export const friendStatusTextMap = {
  [FriendStatus.None]: 'addFriend',
  [FriendStatus.Friend]: 'friend',
  [FriendStatus.FriendRequestSent]: 'requestSent',
  [FriendStatus.FriendRequestRecieved]: 'answerRequest'
}
