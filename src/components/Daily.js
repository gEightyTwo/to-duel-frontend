import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

const Daily = (props) => {
  const {id, name, streak, users_id, archived} = props.daily
  return (
    <ListGroupItem
      className="justify-content-between"
      color= {streak>0 ? 'success' : null}
      >{name}
      <Badge pill>{streak}</Badge>
    </ListGroupItem>
  )
}

export default Daily
