//imports
import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'



const ProductInformation = ({ APIResults, style, ClicksRef }) => {
  // calculating average stars
  let total = 0;
  for (let i of APIResults.review.results) {
    total += i.rating
  }
  let avg = total / APIResults.review.results.length

  // creating array to map stars over
  let starCount = parseInt(avg)
  const starArray = [...Array(starCount).keys()]

  // check for float, round to nearest 0.25
  const gradient = (Math.round((avg - starCount) * 4) / 4) * 100

  // creating 'empty' star array
  let emptyStarArray = []
  if (Math.ceil(avg) < 5) {
    emptyStarArray = [...Array(5 - Math.ceil(avg)).keys()]
  }

  // check for sales price
  let salePrice = APIResults.styles.results[style].sale_price
  let price = APIResults.styles.results[style].original_price

  return (
    <div onClick={() => ClicksRef.current.addClicks('overview', 'productInformation')}>
      <StarContainer>
        {starArray.map(entry => (
          <FontAwesomeIcon icon={icon({ name: 'star' })} />
        ))}
        {gradient > 0 && <Star className="fa-solid fa-star" gradient={gradient} />}
        {emptyStarArray.length > 0 && emptyStarArray.map(entry => (
          <Star className="fa-solid fa-star" gradient={0} />
        ))}
        <ReadReviewText>Read all reviews</ReadReviewText>
      </StarContainer>
      <StyledProductName>{APIResults.product.name}</StyledProductName>
      <StyledSlogan>{APIResults.product.slogan}</StyledSlogan>
      <StyledCategory>Category: {APIResults.product.category}</StyledCategory>
      {salePrice && <ContainerSale>
        <SaleText>Sale ${salePrice}</SaleText>
        <PriceText>${price}</PriceText>
      </ContainerSale>}
      {!salePrice && <p>Price: ${price}</p>}
      <p>Description: <br></br>{APIResults.product.description}</p>
    </div>
  )
}

const StarContainer = styled.div`
  display: flex;
  color: orange;
  margin: 0.25rem;
`

const Star = styled.i`
  background: ${props => `linear-gradient(to right, orange ${props.gradient}%, grey ${props.gradient}%)`};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`

const ReadReviewText = styled.p`
text-decoration: underline;
font-size: small;
color: brown;
margin: 0.25rem;
`

const StyledProductName = styled.h2`
margin: 0.25rem
`

const StyledSlogan = styled.h3`
margin: 0.25rem
`

const StyledCategory = styled.p`
margin: 0.25rem;
`

const ContainerSale = styled.div`
display: flex;
`

const SaleText = styled.p`
font-size: x-large;
color:red;
margin: 0 2rem 0 0;
`

const PriceText = styled.p`
text-decoration: line-through;
margin: 0.25rem
`
export default ProductInformation