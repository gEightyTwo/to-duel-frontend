import React from 'react';
import request from '../helpers/request';
import { connect } from 'react-redux';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Duel from './Duel'
import DuelDailySelector from './DuelDailySelector'
import { fetchDuels, addDuel, fetchDuel, fetchOpponents } from '../actions/duels';
import { getUser } from '../actions/auth';
import withAuthentication from '../helpers/withAuthentication';

class DuelButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      closeAll: false,
      dailySelector: false,
      // dailiesSelected
    };
    this.toggle = this.toggle.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  componentDidMount = async () => {
    // if (this.props.authState) {
      this.props.fetchOpponents()
    // }
  }

  render () {
    const opponents = this.props.duels.opponentList
    const duels = opponents.map(opponent => {
      return (
        <option>{opponent.first_name} {opponent.last_name}</option>
      )
    })
    const dailiesForNewDuel = this.props.dailies.dailies
    console.log('HELLO: ', dailiesForNewDuel)
    const dailyList = dailiesForNewDuel.map(daily => {
      return (
          <option>{daily.name}</option>
      )
    })
    return (
      <div>
        <Button color="info" onClick={this.toggle}>New Duel</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Duel Settings</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleSelect">Who has besmearched your honor?</Label>
                <Input type="select" name="select" id="exampleSelect">
                  {duels}
                </Input>
              </FormGroup>
              <FormGroup>
                <DuelDailySelector />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color={"danger"} onClick={this.toggle}>Demand Satisfaction!</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({duels, duelData, auth, opponentList, dailies}) => {
  return {duels, duelData, auth, opponentList, dailies}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDuels, fetchDuel, getUser, addDuel, fetchOpponents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DuelButton);
