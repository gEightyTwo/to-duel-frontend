import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getUser } from './actions/auth'
import { fetchDailies, add } from './actions/dailies';
import { AuthenticatedRoute } from './helpers';

import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';
import DailyList from './components/DailyList';

class App extends React.Component {
  componentDidMount = () => {
    this.props.fetchDailies()
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ( {dailies} ) => {
  return {dailies}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies, add}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
