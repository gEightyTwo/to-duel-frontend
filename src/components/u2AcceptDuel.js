import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup } from 'reactstrap';
import { bindActionCreators } from 'redux';

import DuelDailySelector from './DuelDailySelector';
import { fetchDuels, acceptDuel, fetchDuel, fetchOpponents } from '../actions/duels';
import { getUser } from '../actions/auth';

class U2AcceptDuel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      removeSelected: false,
      closeAll: false,
      value: [],
    };
    this.toggle = this.toggle.bind(this);
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

  componentDidMount = async () => {
    // if (this.props.authState) {
      this.props.fetchOpponents()
    // }
  }

	handleSelectChange = (value) => {
		const newValue = value.split(',');
	  this.setState(this.state.value.length === 3 ? {value: [this.state.value[0],this.state.value[1],newValue[3]]}: { value: newValue});
  }

  render () {
    console.log('BRYAN', this.props)
    const opponents = this.props.duels.opponentList

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.opponent}{" "}
          Demands Satisfaction, Post Haste!
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
          <ModalHeader toggle={this.toggle}>Duel Settings</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(event)=>{
                event.preventDefault()
                this.props.acceptDuel(this.props.authState.id, this.props.duelId, this.state.value);
                this.setState(this.state.value=[])
              }}>
              <FormGroup>
                <DuelDailySelector dailies={this.props.dailies} handleSelectChange={this.handleSelectChange} value={this.state.value} removeSelected={this.state.removeSelected}/>
              </FormGroup>
            <Button color="danger">Refuse to yield!</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}


// basic design
 // <Button color="danger">
   // {opponentName} Demands Satisfaction, Post Haste!
 // </Button>


const mapStateToProps = ({duels, duelData, auth, opponentList, dailies}) => {
  return {duels, duelData, auth, opponentList, dailies}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDuels, fetchDuel, getUser, acceptDuel, fetchOpponents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(U2AcceptDuel);
