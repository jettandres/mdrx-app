import { DateTime } from 'luxon'

const currentDate = DateTime.now().toLocaleString(DateTime.DATE_FULL)

export { currentDate }
