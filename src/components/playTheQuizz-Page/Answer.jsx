import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

function Answer({
  id,
  label,
  isCorrect,
  variant: variantProps,
  hasTriggered,
  onClick,
}) {
  const [variant, setVariant] = useState(variantProps);

  const isComponentDidMount = useRef(true);
  const { round } = useParams();

  useEffect(() => {
    if (isComponentDidMount.current) {
      isComponentDidMount.current = false;
      return;
    }

    setVariant(isCorrect ? 'success' : 'danger');
  }, [hasTriggered]);

  useEffect(() => {
    setVariant('warning');
  }, [round]);

  return (
    <Button variant={variant} onClick={onClick} id={id}>
      {label}
    </Button>
  );
}

Answer.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  hasTriggered: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Answer;
