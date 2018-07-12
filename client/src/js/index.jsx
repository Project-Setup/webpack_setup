// client/src/js/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import configureStore from './redux/store/configureStore';
import '../css/main.css';


// initialState can be defined here
const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('app'),
);
