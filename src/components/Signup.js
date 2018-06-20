import React from 'react';
import { Button, Form, FormGroup, Alert, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignup } from '../actions/auth';

class Signup extends React.Component {
 state = {
   first_name: '',
   last_name: '',
   email: '',
   password: '',
 };

 handleSignup = event => {
   event.preventDefault();
   this.props.userSignup (this.state, this.props.history);
 }

 render () {
   const nameStyle = {
     display: 'flex',
     justifyContent: 'space-evenly',
     alignItems: 'center',
   }
   return (
     <div className="welcome-container">
       <Modal className="welcome-modal" isOpen centered>
         <Form onSubmit={this.handleSignup}>
           <ModalHeader>Signup</ModalHeader>
           <ModalBody>
             <FormGroup style={nameStyle}>
               <Input
                 type="first_name"
                 name="first_name"
                 id="first_name"
                 placeholder="First Name"
                 value={this.state.first_name}
                 onChange={event => this.setState({first_name: event.target.value})}
               />
               <Input
                 type="last_name"
                 name="last_name"
                 id="last_name"
                 placeholder="Last Name"
                 value={this.state.last_name}
                 onChange={event => this.setState({last_name: event.target.value})}
               />
             </FormGroup>
             <FormGroup>
               <Input
                 type="email"
                 name="email"
                 id="email"
                 placeholder="Email"
                 value={this.state.email}
                 onChange={event => this.setState({email: event.target.value})}
               />
             </FormGroup>
             <FormGroup>
               <Input
                 type="password"
                 name="password"
                 id="password"
                 placeholder="Password"
                 value={this.state.password}
                 onChange={event => this.setState({password: event.target.value})}
               />
             </FormGroup>
             {this.props.showSignupError ? (
               <Alert color="danger">
                 Please complete all fields.
               </Alert>
             ) : null}
           </ModalBody>
           <ModalFooter>
             <Button type="submit" color="info">
               Create User
             </Button>
             <a href="/login">
                Already a member?
             </a>
           </ModalFooter>
         </Form>
       </Modal>
     </div>
   );
 };
};

const mapStateToProps = state => ({showSignupError: state.auth.showSignupError});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({userSignup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
