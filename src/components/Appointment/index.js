import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDITING= "EDITING";
const ERROR_SAVE= "ERROR_SAVE";
const ERROR_DELETE= "ERROR_DELETE";

function Appointment(props) {

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch( (err) => transition(ERROR_SAVE, true))
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onConfirmDelete(){
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then( () => transition(EMPTY))
    .catch( (err) => transition(ERROR_DELETE, true))
    
  }

  function onEdit() {
    transition(EDITING);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={ () => onDelete()}
          onEdit={ () => onEdit()}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={ () => back(EMPTY)} onSave={save}/> }
      {mode === EDITING && (
      <Form 
        interviewers={props.interviewers} 
        interviewer={props.interview.interviewer.id || ""}
        student={props.interview.student}
        onCancel={ () => back(EMPTY)} 
        onSave={save}/> )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && <Confirm onConfirm={onConfirmDelete}  onCancel={ () => back(EMPTY)} message="Are you sure you would like to delete?"/>}
      {mode === ERROR_SAVE && <Error message="Error Saving" onClose={() => back()}/> }
      {mode === ERROR_DELETE && (
        <Error message="Error deleting appointment" onClose={() => back()} />
      )}
    </article>
  )
}

export default Appointment;