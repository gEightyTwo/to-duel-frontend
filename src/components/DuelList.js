import React from 'react'
import { connect } from 'react-redux';
import { ListGroup, Button } from 'reactstrap';
import Duel from './Duel'
import 'bootstrap/dist/css/bootstrap.css'

const DuelList = (props) => {
  const duelsData = props.duels.duels
  const Duels = duelsData.map(duel => {
    return (
      <Duel
        key={duel.id}
        daily={duel}
      />
    )
  })

    return (
      <div>
        <ListGroup>
          {Duels}
        </ListGroup>
        <Button color="info">New Duel</Button>{' '}
      </div>
    )
}

const mapStateToProps = ( {duels} ) => {
  return {duels}
}

export default connect(mapStateToProps, null)(DuelList);
