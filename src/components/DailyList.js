import React from 'react'
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import Daily from './Daily'
import 'bootstrap/dist/css/bootstrap.css'

const DailyList = (props) => {
  const dailiesData = props.dailies.dailies
  const Dailies = dailiesData.map(daily => {
    return (
      <Daily
        key={daily.id}
        daily={daily}
      />
    )
  })

    return (
      <ListGroup>

        {Dailies}
      </ListGroup>

    )
}

const mapStateToProps = ( {dailies} ) => {
  return {dailies}
}

export default connect(mapStateToProps, null)(DailyList);
