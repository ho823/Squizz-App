import React from 'react';

import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import styles from './Difficulty.module.css';

function Difficulty({ changeDifficulty }) {
  return (
    <div className={styles.container}>
      <Form.Label>Select difficulty:</Form.Label>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          variant="warning"
          value="easy"
          name="difficulty"
          onClick={changeDifficulty}
        >
          easy
        </Button>

        <Button
          className={styles.button}
          variant="warning"
          value="medium"
          name="difficulty"
          onClick={changeDifficulty}
        >
          medium
        </Button>

        <Button
          className={styles.button}
          variant="warning"
          value="hard"
          name="difficulty"
          onClick={changeDifficulty}
        >
          hard
        </Button>
      </div>
    </div>
  );
}

Difficulty.propTypes = {
  changeDifficulty: PropTypes.func.isRequired,
};

export default Difficulty;
