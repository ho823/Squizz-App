import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Modal from './ModalHome';

import styles from './TopBar.module.css';

function TopBar() {
  return (
    <Navbar variant="warning" className={styles.topBar}>
      <Navbar.Brand className={styles.brand}>
        <Modal />
      </Navbar.Brand>
    </Navbar>
  );
}

export default TopBar;
