export function formatDate(isoDateString: Date): string {
  // Create a new Date object from the ISO date string
  let date = new Date(isoDateString)

  // Define an array of month names
  let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Extract the day, month, year, hours, and minutes
  let day = date.getDate()
  let month = monthNames[date.getMonth()]
  let year = date.getFullYear()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  // Return the formatted date string
  return `${day.toString().padStart(2, '0')} ${month} ${year.toString().slice(2)} - ${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}
