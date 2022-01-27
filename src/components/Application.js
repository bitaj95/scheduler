import React, { useState, useEffect } from "react";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay( state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day);
  

  const appointmentsParsed = dailyAppointments.map( appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
      key={appointment.id} 
      {...appointment} 
      interview={interview} 
      interviewers={interviewersForDay} 
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    )
  })  

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
        {appointmentsParsed}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

