import React from 'react';

import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import TopBar from './TopBar';
import styles from './Layout.module.css';

function MobileLayout({ children }) {
  return (
    <div className={styles.divMax}>
      <TopBar />
      <Container className={styles.container}>{children}</Container>
    </div>
  );
}

MobileLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileLayout;
