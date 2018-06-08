import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getUser } from './actions/auth'
import { fetchDailies } from './actions/dailies';
import { AuthenticatedRoute } from './helpers'
import withAuthentication from './helpers/withAuthentication'

import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';
import DailyList from './components/DailyList';

class App extends React.Component {
  componentDidMount = () => {

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
        {this.props.authState ?
          <Container>
            <Row>
              <Col xs="12" md="6">
                <DailyList />
              </Col>
              <Col xs="12" md="6">
                <div className="columnTitles">Duels!</div>
              </Col>
            </Row>
          </Container>
        : null}
      </div>
    );
  }
}

const mapStateToProps = ( {dailies} ) => {
  return {dailies}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies}, dispatch)
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(App))
