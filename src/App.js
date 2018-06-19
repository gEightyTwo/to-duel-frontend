import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDailies } from './actions/dailies';
import { fetchDuels } from './actions/duels';
<<<<<<< HEAD
// import { AuthenticatedRoute } from './helpers'
=======

>>>>>>> 80a92a2465938cd90d26c7e01b77c1ab10220f4a
import withAuthentication from './helpers/withAuthentication'

import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import DailyList from './components/DailyList';
import DuelList from './components/DuelList';

class App extends React.Component {
  componentDidMount = () => {

  }
  render() {
    const columnStyle = {
      marginTop: '1rem',
    }

    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </BrowserRouter>
        {this.props.authState ?
          <Container>
            <Row>
              <Col xs="12" md="5" style={columnStyle}>
                <DailyList />
              </Col>
              <Col xs="12" md="7" style={columnStyle}>
                <DuelList authState={this.props.authState}/>
              </Col>
            </Row>
          </Container>
        : null}
      </div>
    );
  }
}

const mapStateToProps = ( {dailies, duels} ) => {
  return {dailies, duels}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies, fetchDuels }, dispatch)
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(App))
