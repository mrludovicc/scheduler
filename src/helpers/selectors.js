export default function getAppointmentsForDay(state, name) {
  console.log(state)
  const filteredDay = state.days.find(day => {
    return day.name === name
  })

  if (!filteredDay) {
    return []
  }

  const appointments = filteredDay.appointments
  const filteredAppointments = appointments.map((appointment) => {
    return state.appointments[appointment];
  })
  //console.log(filteredAppointments)
  return filteredAppointments
}