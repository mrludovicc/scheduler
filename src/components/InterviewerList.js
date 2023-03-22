import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerListItem.scss';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
    />

  })
  return (
    <div className='interviewers'>
      <h5 className='interviewers__header'>interviewers</h5>
      <ul className='interviewers__list'>
        {interviewers}
      </ul>
    </div>
  )
}