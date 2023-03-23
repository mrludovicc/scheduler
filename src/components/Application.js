import React, { useState, useEffect } from "react";
import DayList from './DayList';
import "components/Application.scss";
import "index.scss";
import "components/DayListItem.scss";
import { appointments } from "./Appointment";
import Appointment from 'components/Appointment';
import axios from 'axios';


export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  const appointmentArr = Object.values(appointments).map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />
  })
  useEffect(() => {
    axios.get('/api/days')
      .then((res) => {
        console.log('res:', res)
        setDays(res.data)
      })
  }, [])
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
            days={days}
            value={day}
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
