import React from 'react';

import { Link } from 'react-router-dom';

import Logo from '../makeYourQuizz-Page/images/logos/logo_complet.svg';
import styles from './Homepage.module.css';

function Homepage() {
  return (
    <div className={styles.container}>
      <img className={styles.frontPageLogo} src={Logo} alt="Logo" />
      <div className={styles.buttonDiv}>
        <Link to="/playSoloQuizz">
          <button className={styles.playSoloButton} type="button">
            Play Solo Quizz
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
