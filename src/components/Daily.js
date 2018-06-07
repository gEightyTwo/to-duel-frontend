import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCheck, fetchCompletedStatus } from '../actions/dailies';

import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import FontAwesome from 'react-fontawesome'



class Daily extends React.Component {
  componentDidMount = async () => {
    this.props.fetchCompletedStatus(this.props.daily.users_id, this.props.daily.id)
  }

  //
  // componentDidUpdate = async (prevProps, prevState) => {
  //   if(prevProps.authState !== this.props.authState){
  //     this.props.fetchCompletedStatus(this.props.authState.id)
  //   }
  // }




  render() {
    console.log(this.props)

    const {id, name, streak, users_id, archived} = this.props.daily

    const dailyStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    return (
      <ListGroupItem
        style={dailyStyle}
        color= {streak>0 ? 'success' : null}
        onClick={()=>{this.props.handleCheck(users_id, id, true)
        }}
        >
          {/* <FontAwesome
            name='check-square-o'
            size='2x'
          /> */}
          <FontAwesome
            name='square-o'
            size='2x'
          />
          <FontAwesome
            name='check-square'
            size='2x'
          />
          {/* <FontAwesome
            className='super-crazy-colors'
            name='rocket'
            size='2x'
            // spin
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          /> */}
          {name}
          <Badge pill>{streak}</Badge>
        </ListGroupItem>
      )
  }
}

const mapStateToProps = ({dailiesCompletedStatus}) => {
  return {dailiesCompletedStatus}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({handleCheck, fetchCompletedStatus}, dispatch)
}

export default connect(null, mapDispatchToProps)(Daily)
