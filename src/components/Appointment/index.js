import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';


export default function Appointment(props) {
  const CREATE = "CREATE";
  //console.log(props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(err => transition(ERROR_SAVE, true));
    //.catch goes here
  }

  function deleted(event) {
    transition(DELETING, true);

    return props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => {
        console.log('Catch hit');
        transition(ERROR_DELETE, true)
      });
  }
  console.log('props.interview appointment index: ', props.interview)
  const edit = () => {
    transition(EDIT);
  };
  //console.log(props.interviewers)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleted}
        back={back}
        message={"Are you sure you would like to delete?"} />}
      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />}
      {mode === ERROR_SAVE && <Error onClose={back} message={""} />}
      {mode === ERROR_DELETE && <Error onClose={back} message={""} />}
      {mode === SHOW && (
        <Show
          onEdit={edit}
          onDelete={() => transition(CONFIRM)}
          student={props.interview?.student}
          interviewer={props.interview?.interviewer}
        />
      )}

    </article>
  )
}