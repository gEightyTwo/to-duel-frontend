import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Duel from './Duel'
import 'bootstrap/dist/css/bootstrap.css'

import { fetchDuels, addDuel, fetchDuel } from '../actions/duels';
import { getUser } from '../actions/auth';
import withAuthentication from '../helpers/withAuthentication'
import DuelButton from './DuelButton'

class DuelList extends React.Component {
  constructor(props) {
    super(props)
  }
  // Mounting Methods
  componentDidMount = async () => {
    if (this.props.authState) {
      this.props.fetchDuels(this.props.authState.id)
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.authState !== this.props.authState){
      this.props.fetchDuels(this.props.authState.id)
    }
  }

  render () {
  const duelsData = this.props.duels.duels
  const Duels = duelsData.map(duel => {
    return (
      <Duel
        key={duel.id}
        duel={duel}
        userId={this.props.authState.id}
      />
    )
  })

  const formStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }

    return (
      <div>
        <ListGroup>
          <ListGroupItem
            className="justify-content-between duel-background">
            <div className="columnTitles"> Duels! </div>
          </ListGroupItem>
          {Duels}
          <ListGroupItem style={formStyle}>
            <DuelButton authState={this.props.authState}/>
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = ({duels, duelData, auth}) => {
  return {duels, duelData, auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDuels, fetchDuel, getUser, addDuel }, dispatch)
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(DuelList));
