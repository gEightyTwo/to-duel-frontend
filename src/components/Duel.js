import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

const Duel = (props) => {
  console.log('DUEL: ', props.duels)
  // const { u1_id, u2_id} = props.duel
  return (
    <ListGroupItem>
      {/* className="justify-content-between">{u1_id} */}
      <Badge pill>'KITTENS'</Badge>
    </ListGroupItem>
  )
}

export default Duel
