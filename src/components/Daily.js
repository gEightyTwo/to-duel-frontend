import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

const Daily = (props) => {
  console.log('DAILY: ', props.daily)
  const {id, name, streak, users_id, archived} = props.daily
  return (
    <ListGroupItem
      className="justify-content-between">{name}
      <Badge pill>{streak}</Badge>
    </ListGroupItem>
  )
}

export default Daily
