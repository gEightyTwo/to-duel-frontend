import React from 'react';
import request from '../helpers/request';
import { connect } from 'react-redux';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { bindActionCreators } from 'redux';
import Duel from './Duel'
import { fetchDuels, addDuel, fetchDuel, fetchOpponents } from '../actions/duels';
import { getUser } from '../actions/auth';
import withAuthentication from '../helpers/withAuthentication'

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
    console.log('HELLO: ', this.props)
    const opponents = this.props.duels.opponentList
    const duels = opponents.map(opponent => {
      return (
        <option>{opponent.first_name} {opponent.last_name}</option>
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
                <Label for="exampleSelectMulti">Select Three Dailies</Label>
                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>Demand Satisfaction!</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({duels, duelData, auth, opponentList}) => {
  return {duels, duelData, auth, opponentList}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDuels, fetchDuel, getUser, addDuel, fetchOpponents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DuelButton);
