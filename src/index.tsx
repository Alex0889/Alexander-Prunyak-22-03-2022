import React from 'react';
import {render} from 'react-dom';
import App from './App';
import './prebuild/scss/index.scss';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";

render(
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
