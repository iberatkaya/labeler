import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LabelPage from './containers/LabelPage';
import SliderPage from './containers/SliderPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.SLIDER} component={SliderPage} />
        <Route path={routes.LABEL} component={LabelPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
