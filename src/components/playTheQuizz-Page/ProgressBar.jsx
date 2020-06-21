import React from 'react';
import PropTypes from 'prop-types';

import './progressbar.css';
import SquizzyFirst from '../makeYourQuizz-Page/images/logos/squizzy1.svg';
import SquizzyTwo from '../makeYourQuizz-Page/images/logos/squizzy3.svg';
import SquizzyThree from '../makeYourQuizz-Page/images/logos/squizzy2.svg';
import SquizzyFour from '../makeYourQuizz-Page/images/logos/squizzy4.svg';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-barreau">
      <Filler percentage={percentage} />
    </div>
  );
};

const Filler = ({ percentage }) => {
  return (
    <div
      className={percentage === 100 ? 'filler-full' : 'filler'}
      style={{ width: `${percentage}%` }}
    />
  );
};

function ProgressBarExample({ percentage }) {
  let source;
  if (percentage <= 50) {
    source = SquizzyFirst;
  } else if (percentage > 50 && percentage <= 80) {
    source = SquizzyThree;
  } else if (percentage > 80 && percentage < 100) {
    source = SquizzyTwo;
  } else {
    source = SquizzyFour;
  }
  return (
    <div className="div-whateva">
      <img
        src={source}
        alt="Squizzy"
        className={
          percentage > 80 && percentage < 100
            ? 'logoSquizzos-animated'
            : 'logoSquizzos'
        }
      />
      <ProgressBar percentage={percentage} />
    </div>
  );
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

Filler.propTypes = {
  percentage: PropTypes.number.isRequired,
};

ProgressBarExample.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBarExample;
