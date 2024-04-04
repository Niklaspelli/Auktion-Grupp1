import CurrentAuctions from './CurrentAuctionsMiwa'

import React from 'react'

const AuctionHome = ({searchTerm}) => {
  return (
    <div>
   <CurrentAuctions searchTerm= {searchTerm} />
   </div>
  )
}

export default AuctionHome;