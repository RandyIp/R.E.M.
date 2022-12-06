import React, { useEffect, useState } from 'react';
import ProductComparison from './ProductComparison.jsx'
import Rating from './Rating.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const RelatedCard = ({ relatedProductId, relatedProducts, originalProductFeatures, originalName, ClicksRef, originalReviews }) => {

  const [comparisonToggle,  setComparisonToggle] = useState(false);

  let index = relatedProducts.relatedProductIds.indexOf(relatedProductId)
  const sortedProduct = {
    productArray: relatedProducts.productArrays[index],
    styleArray: relatedProducts.styleArrays[index],
    reviewArray: relatedProducts.reviewArrays[index],
    id: relatedProducts.relatedProductIds[index]
  };

  const getRating = (sortedProduct) => {
    let sum = 0
    let reviews = sortedProduct.reviewArray.results
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating
    }
    return sum / reviews.length
  }

  const closeComparison = () => {
    setComparisonToggle(false)
  }

  return (
    <RelatedCardContainer onClick={() => ClicksRef.current.addClicks('RelatedCards', 'listBehavior')}>

        <div>
          {comparisonToggle ? <ProductComparison sortedProduct={sortedProduct}  originalProductFeatures={originalProductFeatures} rating={getRating(sortedProduct)} close={closeComparison} originalName={originalName} originalReviews={originalReviews}/> : null}
        </div>

        <RelatedProductImage src={sortedProduct.styleArray.results[0].photos[0].thumbnail_url} alt='missing image'>

        </RelatedProductImage>

        <StarContainer>

          <Star onClick={() => setComparisonToggle(true)}>
            <FontAwesomeIcon icon={icon({ name: 'star' })} />
          </Star>

        </StarContainer>

        <NameContainer>
          <div>{sortedProduct.productArray.name}</div>
        </NameContainer>

        <CategoryContainer>
          {sortedProduct.productArray.category}
        </CategoryContainer>

        <div>
          {(sortedProduct.reviewArray.results.length > 0) ? <Rating rating={getRating(sortedProduct)}/> : <span>no reviews</span>}
        </div>

        <div>
          {(sortedProduct.styleArray.results[0].sale_price) ? (<><SaleNewPriceContainer>Sale ${sortedProduct.styleArray.results[0].sale_price}</SaleNewPriceContainer> <SaleOldPriceContainer>${sortedProduct.styleArray.results[0].original_price}</SaleOldPriceContainer></>) : <NoSaleContainer>${sortedProduct.styleArray.results[0].original_price}</NoSaleContainer>}
        </div>

    </RelatedCardContainer>
  )
}

const RelatedProductImage = styled.img`
  display: block;
  flex-grow: 1;
  float: left;
  height: 300px;
  width: 240px;
`

const StarContainer = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  top: 3%;
  color: black;
  left: 88%;
  color: Black;
`

const Star = styled.div`
  position: relative;
  width: 20px;
  color: black;
  bottom: 18.5em;
  color: Black;
`

const RelatedCardContainer = styled.div`
  border-style: solid;
  border-width: thin;
  margin-right: 20px;
  margin-left: 20px;
`

const NameContainer = styled.div`
  font-weight: bold;
  font-size: 110%;
`

const CategoryContainer = styled.div`
  opacity: 0.5;
  font-size: 80%;
`

const NoSaleContainer = styled.div`
  font-weight: 555;
`

const SaleNewPriceContainer = styled.div`
  font-weight: 555;
  color: red;
`

const SaleOldPriceContainer = styled.div`
  font-weight: 555;
  text-decoration: line-through;
`

export default RelatedCard





