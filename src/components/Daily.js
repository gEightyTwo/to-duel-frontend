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
      completed: []
    }
  }

  fetchDuel = (userId, duelId) => {
    request(`/users/${userId}/duels/${duelId}`)                                   //CHANGE ME
    .then((response) => {
      console.log(response)
      this.setState({duel: response.data.data})
    })
  }

  fetchCompletedStatus = (userId, dailyId) => {
    console.log(userId, dailyId)
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'get')
    .then(response => {
      const completedStatus = response.data.data ? response.data.data.completed : false
      this.setState({completed: completedStatus})
    })
  }

  componentDidMount = async () => {
    this.fetchCompletedStatus(this.props.daily.users_id, this.props.daily.id)
  }


  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.authState !== this.props.authState){
      this.fetchCompletedStatus(this.props.authState.id)
    }
  }

  render() {
    console.log(this.props)


    const {id, name, streak, users_id, archived} = this.props.daily

    const dailyStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    const completedDailyStyle = {
      fontWeight: 'bold',
    }

    return (
      <ListGroupItem
        style={dailyStyle}
        // color= {streak>0 ? 'success' : null}
        onClick={()=>{this.props.handleCheck(users_id, id, true)
        }}
        >
          {this.state.completed ?
            <FontAwesome
              name='check-square'
              size='2x'
            /> :
            <FontAwesome
              name='square-o'
              size='2x'
            />
          }
          <div style={!this.state.completed ? completedDailyStyle: null}>
            {name}
          </div>
          <Badge pill>{streak}</Badge>
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
