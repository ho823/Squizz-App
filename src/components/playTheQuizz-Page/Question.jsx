import React from 'react';
import PropTypes from 'prop-types';

import styles from './Question.module.css';

function Question({ question }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>{question.label}</h3>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.func.isRequired,
};

export default Question;
