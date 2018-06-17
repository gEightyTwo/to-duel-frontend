import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDailies, handleCheck, addDaily, archiveDaily } from '../actions/dailies';
// import request from '../helpers/request';
import { ListGroupItem, Badge } from 'reactstrap';
import FontAwesome from 'react-fontawesome'



class Daily extends React.Component {

  render() {
    const {id, name, users_id, streak, completed,
    } = this.props.daily

    const dailyStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    const completedDailyStyle = {
      fontWeight: 'bold',
    }

    const iconContainerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    const deleteIcon = {
      fontSize: '1.5em',
      color: '#8F0000'
    }

    // const thisDailyInfo = this.props.dailies.dailies.find(ele => ele.id === id)

    return (
      <ListGroupItem
        style={dailyStyle}
        color={completed ? 'success' : null}
        >
          {!completed ?
            <FontAwesome
              name='square-o'
              size='2x'
              onClick={()=>{
                this.props.handleCheck(users_id, id, !completed)
              }}
            /> :
            <FontAwesome
              name='check-square'
              size='2x'
              onClick={()=>{
                !this.props.handleCheck(users_id, id, false)
              }}
            />
          }
          <div style={!completed ? completedDailyStyle: null}>
            {name}
          </div>
          <div style={iconContainerStyle}>
            <Badge pill>{streak}</Badge>
            <FontAwesome
              name='remove'
              style={deleteIcon}
              onClick={() => {
                this.props.archiveDaily(users_id, id)
              }}
            />
          </div>
        </ListGroupItem>
      )
  }
}

const mapStateToProps = ({dailies}) => {
  return {dailies}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies, handleCheck, addDaily, archiveDaily}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Daily)
