import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getUser } from './actions/auth'
import { fetchDailies } from './actions/dailies';
import { fetchDuels } from './actions/duels';
import { AuthenticatedRoute } from './helpers';

import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';
import DailyList from './components/DailyList';
import DuelList from './components/DuelList';

class App extends React.Component {
  componentDidMount = () => {
    this.props.fetchDailies()
    this.props.fetchDuels()
    console.log('load')
  }
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
        <Container>
          <Row>
            <Col xs="12" md="6">
              <DailyList />
            </Col>
            <Col xs="12" md="6">
              <h2>Duels!</h2>
              <DuelList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ( {dailies, duels} ) => {
  return {dailies, duels}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies, fetchDuels}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
