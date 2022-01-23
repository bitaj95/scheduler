export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter( dayObj => dayObj.name === day ); 

  //Return empty array if filteredDays array is empty
  if (filteredDays.length === 0) {
    return [];
  }
  
  const appointmentsArray = filteredDays[0].appointments;
  const results = []
  appointmentsArray.forEach( appt =>  results.push(state.appointments[appt]))
 
  return results;
}


export function getInterview(state, interview) {

  const filteredInterviewers = state.interviewers.filter( (interviewer) => {
    interviewer.id === interview.interviewer.id;
  } );

  if (filteredInterviewers.length === 0) {
    return null;
  }

  return {interview, interviewer: filteredInterviewers[0]}

}