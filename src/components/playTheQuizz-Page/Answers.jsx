import React from 'react';

import PropTypes from 'prop-types';
import styles from './Answers.module.css';
import Answer from './Answer';

function Answers({ answers, checkIfRightOrWrong, hasTriggered }) {
  return (
    <>
      <div className={styles.mb2}>
        {answers.map((answer) => {
          return (
            <Answer
              onClick={checkIfRightOrWrong}
              hasTriggered={hasTriggered}
              isCorrect={answer.isCorrect}
              key={answer.id}
              variant="warning"
              id={answer.id}
              label={answer.label}
            />
          );
        })}
      </div>
    </>
  );
}

Answers.propTypes = {
  answers: PropTypes.func.isRequired,
  checkIfRightOrWrong: PropTypes.func.isRequired,
  hasTriggered: PropTypes.bool.isRequired,
};

export default Answers;
