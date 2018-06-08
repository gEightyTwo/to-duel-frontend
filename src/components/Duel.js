import React from 'react';
import request from '../helpers/request';
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDuel } from '../actions/duels';
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import withAuthentication from '../helpers/withAuthentication'

//this.state.duel is not this.props.duel. props contains a list of duels. state contains daily data about the duel in questions.

class Duel extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      duel: []
    }
  }

  fetchDuel = (userId, duelId) => {
    request(`/users/${userId}/duels/${duelId}`)                                   //CHANGE ME
    .then((response) => {
      console.log(response)
      this.setState({duel: response.data.data})
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
      endTime,
      id,
      startTime,
      u1_confirmed,
      u1_id
    } = this.props.duel
    const userName = this.props.authState.name
    const opponentName = this.props.duel.u1_name === this.props.authState.name ? this.props.duel.u2_name : this.props.duel.u1_name

    let userDailies = []
    let opponentDailies = []

    let userDailyCounts = [0,0,0]
    let opponentDailyCounts = [0,0,0]

    if(this.state.duel.user1_dailies) {
      if (this.props.userId === this.state.duel.u1_id){
        this.state.duel.user1_dailies.forEach(daily=> {
          userDailies.push(daily.name)
          // console.log('LOOK AT ME: ', daily)
          daily.history.forEach(ele=> {
            let index = userDailies.indexOf(daily.name)
            if(ele.completed === true) userDailyCounts[index]+1
          })
        })
        this.state.duel.user2_dailies.forEach(daily=> opponentDailies.push(daily.name))
      } else {
        this.state.duel.user2_dailies.forEach(daily=> userDailies.push(daily.name))
        this.state.duel.user1_dailies.forEach(daily=> opponentDailies.push(daily.name))
      }
    }

    console.log('HAMBRUGARZ: ', this.props.duel)
    console.log('KITTENS: ', this.state.duel)

    return (
      <ListGroupItem
        className="justify-content-between">
        <ListGroupItemHeading>
          {opponentName}
          <Badge pill>'KITTENS'</Badge>
        </ListGroupItemHeading>
        <ListGroupItemText>
          <Container>
            <Row>
              <Col xs="6" md="6">
                <Card>
                  <CardTitle>Your Dailies:</CardTitle>
                  <CardText>
                    <ListGroup>
                      <ListGroupItem>-{userDailies[0]} <Badge pill>{userDailyCounts[0]}/5</Badge></ListGroupItem>
                      <ListGroupItem>-{userDailies[1]} <Badge pill>{userDailyCounts[1]}/5</Badge></ListGroupItem>
                      <ListGroupItem>-{userDailies[2]} <Badge pill>{userDailyCounts[2]}/5</Badge></ListGroupItem>
                    </ListGroup>
                  </CardText>
                </Card>
              </Col>
              <Col xs="6" md="6">
                <Card>
                  <CardTitle>{opponentName} Dailies:</CardTitle>
                  <CardText>
                    <ListGroup>
                      <ListGroupItem>-{opponentDailies[0]} <Badge pill>1/5</Badge></ListGroupItem>
                      <ListGroupItem>-{opponentDailies[1]} <Badge pill>3/5</Badge></ListGroupItem>
                      <ListGroupItem>-{opponentDailies[2]} <Badge pill>5/5</Badge></ListGroupItem>
                    </ListGroup>
                  </CardText>
                </Card>
              </Col>
            </Row>
          </Container>
        </ListGroupItemText>
      </ListGroupItem>
    )
  }
}


export default withAuthentication(Duel);
