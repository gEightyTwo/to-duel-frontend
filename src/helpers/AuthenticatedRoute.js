import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import withAuthentication from './withAuthentication'

const AuthenticatedRoute = (props) => {
  if(props.authStatePending && !props.authState){
    return props.loading || <div>Loading...</div>
  }
  else {
    return props.authState ? <Route {...props} /> : <Redirect to='/' />
  }
}

export default withAuthentication(AuthenticatedRoute)
