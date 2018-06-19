import React from 'react';
import request from '../helpers/request';
import { ListGroup, ListGroupItem, Badge, Button, FormGroup } from 'reactstrap';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchDuel } from '../actions/duels';
import { Container, Row, Col, Card, CardHeader, Alert } from 'reactstrap';
import withAuthentication from '../helpers/withAuthentication'

//this.state.duel is not this.props.duel. props contains a list of duels. state contains daily data about the duel in questions.

class Duel extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      duel: [],
      user: {},
      opponent: {}
    }
  }

  fetchDuel = (userId, duelId) => {
    request(`/users/${userId}/duels/${duelId}`)
    .then((response) => {
      console.log('Response: ', response.data.data);
      let userDailies= [];
      let opponentDailies= []
      let userDailyCounts= [0,0,0]
      let opponentDailyCounts= [0,0,0]

      if (this.props.userId === response.data.data.u1_id){
        response.data.data.user1_dailies.map(daily=> {
            userDailies.push(daily.name)
          daily.history.map(ele=> {
            let index = userDailies.indexOf(daily.name)
            if(ele.completed === true) userDailyCounts[index]++
          })
        })
        response.data.data.user2_dailies.map(daily=> {
          opponentDailies.push(daily.name)
          daily.history.map(ele=> {
            let index = opponentDailies.indexOf(daily.name)
            if(ele.completed === true) opponentDailyCounts[index]++
          })
        })
      } else {
        response.data.data.user2_dailies.map(daily=> {
          userDailies.push(daily.name)
          daily.history.map(ele => {
            let index = userDailies.indexOf(daily.name)
            if(ele.completed === true) userDailyCounts[index]++
          })
        })
        response.data.data.user1_dailies.map(daily=> {
          opponentDailies.push(daily.name)
          daily.history.map(ele => {
            let index = opponentDailies.indexOf(daily.name)
            if(ele.completed === true) opponentDailyCounts[index]++
          })
        })
      }
      this.setState({duel: response.data.data, user:{userDailies, userDailyCounts}, opponent:{opponentDailies, opponentDailyCounts}}, )
    })
  }

  // Mounting Methods
  componentDidMount = async () => {
    if (this.props.authState) {
      this.fetchDuel(this.props.authState.id, this.props.duel.id)
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.authState !== this.props.authState){
      this.fetchDuel(this.props.authState.id, this.props.duel.id)
    }
  }

  render () {
    const {
      opponent_name,
      archived,
      created_at,
      end_time,
      id,
      startTime,
      u1_confirmed,
      u1_id,
      u2_accepted
    } = this.props.duel
    const userName = this.props.authState.name
    const opponentName = this.props.duel.u1_name === this.props.authState.name ? this.props.duel.u2_name : this.props.duel.u1_name
    const name = this.props.dailies ? this.props.dailies.name: null

    return (
      <Container
        className="justify-content-between duel-background">
          <Row
            className="duel-header">
            <Col>
              <h3>vs. {opponentName}</h3>
            {(this.state.user.userDailyCounts && this.state.user.userDailyCounts.reduce((acc, val)=> acc + val ) > this.state.opponent.opponentDailyCounts.reduce((acc, val)=> acc + val )) && (Date.parse(this.props.duel.end_time) < Date.parse(new Date())) ? <Alert color="success">You Won!</Alert> : null }
            {(this.state.user.userDailyCounts && this.state.user.userDailyCounts.reduce((acc, val)=> acc + val ) < this.state.opponent.opponentDailyCounts.reduce((acc, val)=> acc + val )) && (Date.parse(this.props.duel.end_time) < Date.parse(new Date())) ? <Alert color="danger">You Lose!</Alert> : null }
              {Date.parse(this.props.duel.end_time) < Date.parse(new Date()) ? <Badge color='dark' pill> Duel Finished</Badge>: null}
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6">
              <Card>
                <CardHeader><Badge pill>{this.state.user.userDailies ? this.state.user.userDailyCounts.reduce((acc, val)=> acc + val ) : null}/15</Badge> Your Dailies:</CardHeader>
                    <ListGroup>
                      <ListGroupItem>{this.state.user.userDailies ? this.state.user.userDailies[0]: null} <Badge color='info' pill>{this.state.user.userDailies ? this.state.user.userDailyCounts[0]: null}/5</Badge></ListGroupItem>
                      <ListGroupItem>{this.state.user.userDailies ? this.state.user.userDailies[1]: null} <Badge color='info' pill>{this.state.user.userDailies ? this.state.user.userDailyCounts[1]: null}/5</Badge></ListGroupItem>
                      <ListGroupItem>{this.state.user.userDailies ? this.state.user.userDailies[2]: null} <Badge color='info' pill>{this.state.user.userDailies ? this.state.user.userDailyCounts[2]: null}/5</Badge></ListGroupItem>
                    </ListGroup>
              </Card>
            </Col>
            <Col xs="12" md="6">
              <Card>
                <CardHeader><Badge pill>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailyCounts.reduce((acc, val)=> acc + val ) : null}/15</Badge> {opponentName} Dailies:</CardHeader>
                  <ListGroup>
                    <ListGroupItem>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailies[0]: null} <Badge color='info' pill>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailyCounts[0]: null}/5</Badge></ListGroupItem>
                    <ListGroupItem>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailies[1]: null} <Badge color='info' pill>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailyCounts[1]: null}/5</Badge></ListGroupItem>
                    <ListGroupItem>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailies[2]: null} <Badge color='info' pill>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailyCounts[2]: null}/5</Badge></ListGroupItem>
                  </ListGroup>
              </Card>
            </Col>
          </Row>
          { u2_accepted && !u1_confirmed && end_time > this.props.today ? <FormGroup> <Button color="info">Accept Your Opponent's Terms</Button> <Button color="secondary">Reject This Charlatan's Duel</Button> </FormGroup>: null}
          { !u2_accepted && end_time > this.props.today ? <Button color="danger">{opponentName} Demands Satisfaction, Post Haste!</Button>: null }
      </Container>
    )
  }
}


export default withAuthentication(Duel);
