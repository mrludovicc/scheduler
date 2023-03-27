import React, { useState, useEffect } from "react";
import DayList from './DayList';
import "components/Application.scss";
import "index.scss";
import "components/DayListItem.scss";
// import { appointments } from "./Appointment";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';
import axios from 'axios';


export default function Application(props) {

  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState((prev) => ({ ...prev, day }));


  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // const appointmentArr = Object.values(appointments).map(appointment => {
  //   return <Appointment key={appointment.id} {...appointment} />
  // })
  const appointmentArr = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview} />
  })
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
        console.log('all:', all[0].data)
        console.log('all:', all[1])
        // setDays(res.data)
      })
  }, [])
  console.log(state.interviewers)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArr}
      </section>
    </main>
  );
}
