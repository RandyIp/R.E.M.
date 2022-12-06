import React from 'react'
import RelatedItemsAndOutfit from './Components/RelatedItemsAndOutfit.jsx'

const MainEric = ({ APIResults, ClicksRef }) => {

  return (
  <div>
    {(APIResults.product.id) ? <RelatedItemsAndOutfit APIResults={APIResults} ClicksRef={ClicksRef}/> : null}
  </div>
  )
}

export default MainEric