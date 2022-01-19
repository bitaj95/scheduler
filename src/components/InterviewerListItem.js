import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss'

function InterviewerListItem(props) {
  const { id, name, avatar, selected } = props;

  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });


  return (
    <li onClick={() => props.setInterviewer(id)} className={interviewClass}>
      <img
        key={id}
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}

export default InterviewerListItem;