import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Daily from './Daily'
import 'bootstrap/dist/css/bootstrap.css'

import { fetchDailies, addDaily } from '../actions/dailies';
import withAuthentication from '../helpers/withAuthentication'

class DailyList extends React.Component {

  // Mounting Methods
  componentDidMount = async () => {
    this.props.fetchDailies(this.props.authState.id)
  }



  render () {
    const dailiesData = this.props.dailies.dailies.sort(function(a, b){
      // Compare the 2 dates
      if(a.id < b.id) return -1;
      if(a.id > b.id) return 1;
      return 0;
    })

    const Dailies = dailiesData.map(daily => {
      return (
        <Daily
          key={daily.id}
          daily={daily}
        />
      )
    })

    const formStyle = {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }
    return (
      <ListGroup className="DailyList">
        <ListGroupItem
          className="justify-content-between">
          <div className="columnTitles"> Dailies </div>
        </ListGroupItem>
        {Dailies}
        <ListGroupItem>
          <form
            style={formStyle}
            onSubmit={(event)=>{
              event.preventDefault()
              this.props.addDaily(event.target.name.value,this.props.authState.id)
              event.target.name.value=''
              }}
            >
            <input type="text" name="name" />
            <Button color="info"
              > New Daily</Button>
          </form>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

const mapStateToProps = ({dailies, auth}) => {
  return {dailies, auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies, addDaily}, dispatch)
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(DailyList))
