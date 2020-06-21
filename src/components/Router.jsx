import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PropTypes from 'prop-types';

import Homepage from './home-Page/Homepage';
import Main from './makeYourQuizz-Page/MainPage';
import MainPlayTheQuizz from './playTheQuizz-Page/MainPage';
import Mobile from './layouts/Mobile.layout';
import ScoreBoard from './scoreBoard-Page/ScoreBoard';

function LayoutedRoute({ layout: Layout, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
}

function Routzer() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <LayoutedRoute path="/playSoloQuizz" layout={Mobile} component={Main} />
        <LayoutedRoute
          path="/play/:round"
          layout={Mobile}
          component={MainPlayTheQuizz}
        />
        <LayoutedRoute path="/score" layout={Mobile} component={ScoreBoard} />
      </Switch>
    </Router>
  );
}

LayoutedRoute.propTypes = {
  layout: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
};

export default Routzer;
