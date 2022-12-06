import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../API.js';
import OutfitRating from './OutfitRating.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const OutfitCard = ({ outfit, removeKeys }) => {

  const [savedProduct,  setSavedProduct] = useState();

  if (outfit) {
    useEffect(() => {
      const getProductInfo = (axios.get(`${API.server}products/${outfit}`, { headers: {'Authorization': API.gitToken}}))

      const getProductStyles = (axios.get(`${API.server}products/${outfit}/styles`, { headers: {'Authorization': API.gitToken}}))

      const getProductReviews = (axios.get(`${API.server}reviews/?product_id=${outfit}`, { headers: {'Authorization': API.gitToken}}))

      Promise.all( [getProductInfo, getProductStyles, getProductReviews] )
        .then((results) => {
          let container = {}
          container.productInfo = results[0].data
          container.productStyles = results[1].data
          container.productReviews = results[2].data
          setSavedProduct(container)
        })
    }, [])
  }

  const getRating = (savedProduct) => {
    let sum = 0
    let reviews = savedProduct.productReviews.results
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating
    }
    return sum / reviews.length
  }

  if (savedProduct) {
    return (
      <OutfitCardContainer>


        <OutfitProductImage src={savedProduct.productStyles.results[0].photos[0].thumbnail_url} alt='missing image'>

        </OutfitProductImage>

        <DeleteButtonContainer>

          <DeleteButton onClick={() => (removeKeys(outfit))}>
            <FontAwesomeIcon icon={icon({ name: 'x' })}/>
          </DeleteButton>

        </DeleteButtonContainer>

        <NameContainer>
          <div>{savedProduct.productInfo.name}</div>
        </NameContainer>

        <CategoryContainer>
          {savedProduct.productInfo.category}
        </CategoryContainer>

        <div>
          {(savedProduct.productReviews.results.length > 0) ? <OutfitRating rating={getRating(savedProduct)}/> : <span>no reviews</span>}
        </div>

        <div>
          {(savedProduct.productStyles.results[0].sale_price) ? (<><SaleNewPriceContainer>Sale ${savedProduct.productStyles.results[0].sale_price}</SaleNewPriceContainer> <SaleOldPriceContainer>${savedProduct.productStyles.results[0].original_price}</SaleOldPriceContainer></>) : <NoSaleContainer>${savedProduct.productStyles.results[0].original_price}</NoSaleContainer>}
        </div>

      </OutfitCardContainer>



    )
  }

}


const OutfitProductImage = styled.img`
  display: block;
  flex-grow: 1;
  float: left;
  height: 300px;
  width: 240px;
`

const DeleteButtonContainer = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  top: 3%;
  color: black;
  left: 88%;
  color: Black;
`

const DeleteButton = styled.div`
  position: relative;
  width: 20px;
  color: black;
  bottom: 18.5em;
  color: red;
`

const OutfitCardContainer = styled.div`
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


export default OutfitCard