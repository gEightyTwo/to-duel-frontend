import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Daily from './Daily'
import 'bootstrap/dist/css/bootstrap.css'

import { fetchDailies, addDaily } from '../actions/dailies';
import { getUser } from '../actions/auth';
import withAuthentication from '../helpers/withAuthentication'

class DailyList extends React.Component {
  constructor (props) {
    super(props)



  }
  // Mounting Methods
  componentDidMount = async () => {
    if (this.props.authState) {
      this.props.fetchDailies(this.props.authState.id)
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.authState !== this.props.authState){
      this.props.fetchDailies(this.props.authState.id)
    }
  }

  render () {
    const dailiesData = this.props.dailies.dailies
    const Dailies = dailiesData.map(daily => {
      return (
        <Daily
          key={daily.id}
          daily={daily}
        />
      )
    })

    console.log(this.props)

    return (
      <ListGroup>
        <ListGroupItem
          className="justify-content-between">
          <h2> DAILIES </h2>
        </ListGroupItem>
        {Dailies}
        <Button color="primary"
          // onClick={()=>{this.props.addDaily('New Name',this.props.authState.id)}}
          >Add Daily</Button>{' '}
      </ListGroup>
    )
  }
}

const mapStateToProps = ({dailies, auth}) => {
  return {dailies, auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies, getUser, addDaily}, dispatch)
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(DailyList))
