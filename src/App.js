import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DetailsPage from './pages/details';
import FormPage from './pages/form';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FormPage} />
        <Route path="/details" component={DetailsPage} />
      </Switch>
    </Router>
  );
};

export default App;
