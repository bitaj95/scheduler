import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  useEffect( () => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  const setDay = day => setState({ ...state, day });
  
  function bookInterview(id, interview) {
    
    /* state.days contains array of Mon-Fri days objects,
    state.day contains the name of the day of appointments selected.
    --> targetedDay will hold the days object (from state.days) of the day user selected */
    const targetedDay = state.days.filter( day => day.name === state.day );
    
    //Locate index in "days" array where the selected day is located
    const dayIndex = state.days.findIndex(day => day.name === state.day)
  
    //Will contain updated days object. 
    //Ternary in place to prevent spots decreasing by one when editing an appointment (checks to see if interview exists)
    const dayWithUpdatedSpots = {
      ...targetedDay[0],
      spots: (state.appointments[id].interview ? targetedDay[0].spots : targetedDay[0].spots - 1)
    }


    // Created updated version of entire days object to display new # spots
    const days = [
      ...state.days.slice(0, dayIndex),
      dayWithUpdatedSpots,
      ...state.days.slice(dayIndex + 1)
    ]
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    .put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then( (res) => {
      setState({
        ...state,
        appointments,
        days
      });
     })
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    /*   state.days contains array of all the 5 days objects (Mon - Fri), the key "name" holds day name
    state.day contains the name of the day of appointments being viewed 
    --> targetedDay will hold the days object (from state.days) of the day user selected */
    const targetedDay = state.days.filter( day => day.name === state.day );
    const dayIndex = state.days.findIndex(day => day.name === state.day)
  
    const dayWithUpdatedSpots = {
      ...targetedDay[0],
      spots: targetedDay[0].spots + 1 
    }
    // Created updated version of entire days object to display new # spots
    const days = [
      ...state.days.slice(0, dayIndex),
      dayWithUpdatedSpots,
      ...state.days.slice(dayIndex + 1)
    ]

    return axios
    .delete(`/api/appointments/${id}`)
    .then( (res) => {
      setState({
        ...state,
        appointments,
        days
        }
      )
    })
  }


  return (
    {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
  )
}
