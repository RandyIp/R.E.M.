import React, {useEffect, useState} from 'react';
import RelatedCard from './RelatedCard.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const RelatedList = ({ relatedProducts, originalProductFeatures, originalName, ClicksRef, originalReviews }) => {

  const [index,  setIndex] = useState(0);
  const [isOpen,setIsOpen] = useState(false)

    return (
      <div onClick={() => ClicksRef.current.addClicks('RelatedCards', 'relatedProductCards')}>
        <RelatedContainer>
          <Header><div>Related Items</div></Header>

            {(index === 0) ? null :
            <ContainerLeftArrow onClick={() => (setIndex(index - 1))}>
              <FontAwesomeIcon icon={icon({ name: 'circle-arrow-left' })}/>
            </ContainerLeftArrow>}

            {((index + 4 ) === relatedProducts?.relatedProductIds.length) ? null :
            <ContainerRightArrow onClick={() => (setIndex(index + 1))}>
              <FontAwesomeIcon icon={icon({ name: 'circle-arrow-right' })}/>
            </ContainerRightArrow>}

            <div>
              <RelatedCardsContainer>
                {(relatedProducts) ? (relatedProducts?.relatedProductIds).slice(index, index + 4).map((relatedProductId) => (<RelatedCard relatedProductId={relatedProductId} relatedProducts={relatedProducts}  originalProductFeatures={originalProductFeatures} originalName={originalName} originalReviews={originalReviews} ClicksRef={ClicksRef}/>))  : <span>no related</span>}
              </RelatedCardsContainer>
            </div>
        </RelatedContainer>

      </div>
    )
  }



const RelatedContainer = styled.div`
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 150%;
  font-weight: bold;
`

const RelatedCardsContainer = styled.div`

  display: flex;
  margin: 10px;
  flex-direction: row;
`

const ContainerRightArrow = styled.div`
  position: relative;
  top: 6.7em;
  left: 102%;
  width: 30px;
  color: grey;
  font-size: x-large;
  cursor: pointer;
`

const ContainerLeftArrow = styled.div`
  position: relative;
  top: 6.7em;
  right: 5%;
  width: 30px;
  color: grey;
  font-size: x-large;
  cursor: pointer;
`

export default RelatedList

