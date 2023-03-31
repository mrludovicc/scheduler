/**
 * 
 * @param {string} state 
 * @param {string} name 
 * @returns An array of all appointments for a specific day 
 */
export function getAppointmentsForDay(state, name) {
  const filteredDay = state.days.find(day => {
    return day.name === name
  });

  if (!filteredDay) {
    return []
  }

  const appointments = filteredDay.appointments
  const filteredAppointments = appointments.map((appointment) => {
    return state.appointments[appointment];
  });

  return filteredAppointments
};

/**
 * 
 * @param {string} state 
 * @param {string} name 
 * @returns An array of all interviewers for a specific day 
 */
export function getInterviewersForDay(state, name) {
  const filteredDay = state.days.find(day => {
    return day.name === name
  });

  if (!filteredDay) {
    return []
  };

  const interviewers = filteredDay.interviewers
  const filteredInterviewers = interviewers.map((interviewer) => {
    return state.interviewers[interviewer];
  });

  return filteredInterviewers
};

/**
 * 
 * @param {string} state 
 * @param {Object} interview 
 * @returns An object containing the interviewer and student name for a specified interview
 */
export function getInterview(state, interview) {
  if (!interview) {
    return null
  };
  const interviewerInfo =
  {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  }

  return interviewerInfo;
};