import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './store'

import { request, AuthenticationService } from './helpers/index'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
const storeInstance = store()


request('/auth/token')
.then((response)=>{
  AuthenticationService.setAuthState(response.data)
})

window.AuthenticationService = AuthenticationService


ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
