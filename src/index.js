import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const storeInstance = store()

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
