export enum ItemType {
  Event = 0,
  User = 1
}

export type EventAndUserSelectorItem =
  | {
      type: ItemType.Event
      id: string
      displayName: string
      capacity: number
      startDate: Date
      location?: string
      externalLink?: string
      description?: string
      pictureUrl?: string
    }
  | {
      type: ItemType.User
      id: string
      displayName: string
      fullName: string
      pictureUrl?: string
    }
