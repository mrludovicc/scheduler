export function getAppointmentsForDay(state, name) {
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
  console.log(filteredDay)
  console.log(filteredAppointments)
  return filteredAppointments
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewerInfo =
  {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  }

  //console.log('intervierwerInfo:', interviewerInfo)
  //console.log('state:', state, 'interview:', interview)
  return interviewerInfo;
}