import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getUser } from './actions/auth'

import './styles/App.css';

import logo from './assets/logo.svg';
import Header from './components/Header'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
