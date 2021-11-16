import moment from 'moment'
import { IEventDetail } from './EventDetailTemplate'

export const getGoogleCalendarUrl = (event: IEventDetail) => {
  const url = new URL('https://calendar.google.com/calendar/u/0/r/eventedit')

  url.searchParams.append('location', event.location?.googleMapsUrl || event.externalLink!)
  url.searchParams.append('text', event.name)

  const format = 'YYYYMMDDTHHmm00'
  const startDate = moment(event.startDate).format(format)
  const endDate = moment(event.endDate).format(format)
  url.searchParams.append('dates', `${startDate}Z/${endDate}Z`)

  const origin = `${window.location.origin}/events/${event.id}`
  const link = `<a href="${origin}">${event.name}</a>`
  url.searchParams.append('details', `${event.description || ''}\n\n${link}`)

  return url.toString()
}
