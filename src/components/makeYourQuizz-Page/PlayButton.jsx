import React from 'react';

import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import styles from './PlayButton.module.css';

function Play({ getData }) {
  return (
    <Button
      className={styles.button}
      variant="info"
      type="submit"
      onClick={getData}
    >
      Play
    </Button>
  );
}

Play.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default Play;
