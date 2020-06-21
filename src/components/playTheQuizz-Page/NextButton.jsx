import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

function NextButton({ nextQuestion }) {
  return (
    <Button variant="info" onClick={nextQuestion}>
      Next
    </Button>
  );
}

NextButton.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
};

export default NextButton;
