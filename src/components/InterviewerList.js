import React from 'react';
import PropTypes from 'prop-types';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerListItem.scss';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
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
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};