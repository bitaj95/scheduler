import React from "react";
import 'components/InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {

  const { interviewers } = props;

  const mappedInterviewers = interviewers.map( interviewer => (
    <InterviewerListItem 
      key= {interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar}
      selected={props.value === interviewer.id}
      setInterviewer={() => props.onChange(interviewer.id)}
      /> 
  ))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list"> { mappedInterviewers } </ul>
    </section>
  )
}

export default InterviewerList;