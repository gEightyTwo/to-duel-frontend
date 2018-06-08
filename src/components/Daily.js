import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCheck } from '../actions/dailies';
import request from '../helpers/request';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import FontAwesome from 'react-fontawesome'



class Daily extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      completed: '',
      streak: 0,
    }
  }

  fetchCompletedStatus = (userId, dailyId) => {
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'get')
    .then(response => {
      console.log('response', response.data.data)
      const completedStatus = response.data.data ? response.data.data.completed : false
      this.setState({completed: completedStatus})
    })
  }

  handleCheck = (userId, dailyId, completed) => {
    console.log(completed)
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'post', {completed: completed})
    .then((response) => {
      console.log(response)

      this.fetchCompletedStatus(userId, dailyId)
    })
    .then(response => {
      this.fetchStreak(userId, dailyId)
    })
  }

  fetchStreak = (userId, dailyId) => {
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory/streak`, 'patch')
    .then((response) => {
      if(response.data.data===0) {
        return request(`/users/${userId}/dailies/${dailyId}/dailyHistory/streak`, 'patch', {daysAgo: 1})
      } else {
        return response
      }
    })
    .then((response) => {
      if(response) {
        this.setState({streak: response.data.data})
      }
    })
    .then((response) => {
      this.fetchCompletedStatus(userId, dailyId)
    })
  }


  // Mounting Methods

  componentDidMount = async () => {
    this.fetchStreak(this.props.daily.users_id, this.props.daily.id)
    this.fetchCompletedStatus(this.props.daily.users_id, this.props.daily.id)
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.authState !== this.props.authState){
      this.fetchCompletedStatus(this.props.authState.id)
    }
  }

  render() {
    const {id, name, streak, users_id, archived} = this.props.daily

    const dailyStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    const completedDailyStyle = {
      fontWeight: 'bold',
    }
    console.log(!this.state.completed)
    return (
      <ListGroupItem
        style={dailyStyle}
        onClick={()=>{
          this.handleCheck(users_id, id, !this.state.completed)
        }}
        >
          {!this.state.completed ?
            <FontAwesome
              name='square-o'
              size='2x'
            /> :
            <FontAwesome
              name='check-square'
              size='2x'
            />
          }
          <div style={!this.state.completed ? completedDailyStyle: null}>
            {name}
          </div>
          <Badge pill>{this.state.streak}</Badge>
        </ListGroupItem>
      )
  }
}

const mapStateToProps = ({dailiesCompletedStatus}) => {
  return {dailiesCompletedStatus}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({handleCheck}, dispatch)
}

export default connect(null, mapDispatchToProps)(Daily)
