import React, { useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import styles from './ModalHome.module.css';
import Logo from '../makeYourQuizz-Page/images/logos/logo_complet.svg';

function ModalHome() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  return (
    <>
      <button onClick={handleShow} type="button" className={styles.buttonLogo}>
        <img
          alt="logo"
          src={Logo}
          width="50"
          height="50"
          className="d-inline-block align-center"
        />
      </button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalText}>
            Do you want to quit the current game?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer className={styles.buttonGroup}>
          <Link to="/" onClick={() => history.push('/')}>
            <Button variant="success" className={styles.buttonYes}>
              Yes
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={handleClose}
            className={styles.buttonNo}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalHome;
