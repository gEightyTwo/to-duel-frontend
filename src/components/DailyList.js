import React from 'react'
import { CardDeck } from 'reactstrap';
import Daily from './Daily'
import 'bootstrap/dist/css/bootstrap.css'

const DailyList = (props) => {
  const Dailies = snackData.map(snack => {
    return (
      <Daily
        key={snack.id}
        // snack={snack}
        // handleCardShow={handleCardShow}
      />
    )
  })

    return (
      <CardDeck>
        {Dailies}
      </CardDeck>

    )
}

export default DailyList
