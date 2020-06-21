import React from 'react';

import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

import styles from './NumberOfQuestions.module.css';

const array = [];
for (let i = 1; i < 21; i += 1) {
  array.push(i);
}

function NumberOfQuestions({ changeNumberOfQuestions }) {
  return (
    <div className={styles.container}>
      <Form.Label>Number of questions: </Form.Label>
      <Form.Control
        as="select"
        custom
        onChange={changeNumberOfQuestions}
        name="numberOfQuestions"
        className={styles.questionBox}
      >
        <option>Numbers...</option>
        {array.map((item) => {
          return <option key={item}>{item}</option>;
        })}
      </Form.Control>
    </div>
  );
}

NumberOfQuestions.propTypes = {
  changeNumberOfQuestions: PropTypes.func.isRequired,
};

export default NumberOfQuestions;
