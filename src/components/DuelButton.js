import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { bindActionCreators } from 'redux';
import Duel from './Duel'
import { fetchDuels, addDuel, fetchDuel } from '../actions/duels';
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
    this.toggleNested = this.toggleNested.bind(this);
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
  render () {
    console.log(this.props)
    // const {id, name, streak, users_id, archived} = this.props.daily
    return (
      <div>
        <Button color="info" onClick={this.toggle}>New Duel</Button>{' '}
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>PREPARE YOUR DUEL</ModalHeader>
            <ModalBody>

              <br />
              <Button color="success" onClick={this.toggleNested}>Select Dailies</Button>
              <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                <ModalHeader>Nested Modal title</ModalHeader>
                <ModalBody>
                  <ListGroupItem
                    className="justify-content-between">
                      {/* {this.props.daily.name} */}
                  </ListGroupItem>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                  <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
                </ModalFooter>
              </Modal>
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

const mapStateToProps = ({duels, duelData, auth}) => {
  return {duels, duelData, auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDuels, fetchDuel, getUser, addDuel}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DuelButton);
