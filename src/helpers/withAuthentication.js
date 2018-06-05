import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'

class AuthenticationWrapper extends Component{
  constructor(props){
    super(props)

    this.state = {
      authState: null,
      authStatePending: true
    }
  }

  handleAuthState = (authState) => {
    this.setState({ authState, authStatePending: false})
  }

  componentWillMount(){
    const authState = AuthenticationService.getAuthState()
    this.setState({ authState, authStatePending: authState ? false : true })

    AuthenticationService.registerEvent(this.handleAuthState)
  }

  componentWillUnmount(){
    AuthenticationService.deRegisterEvent(this.handleAuthState)
  }

  render(){
    const { Component, ...props} = this.props
    return (
      <Component {...props} authState={this.state.authState} authStatePending={this.state.authStatePending}/>
    )
  }

}

export default (Component) => (props) => <AuthenticationWrapper Component={Component} {...props}/>
