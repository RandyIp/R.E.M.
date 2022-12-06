import React, {useEffect, useState} from 'react';
import API from '../API.js';
import RelatedList from './RelatedList.jsx';
import RelatedCard from './RelatedCard.jsx'
import OutfitList from './OutfitList.jsx';
import axios from 'axios';
import styled from 'styled-components'


const RelatedItemsAndOutfit = ({ APIResults, ClicksRef }) => {

  const product_id = APIResults.product.id

  const [relatedProducts,  setRelatedProducts] = useState();

  useEffect(() => {
     axios.get(`${API.server}products/${product_id}/related`, { headers: {'Authorization': API.gitToken}})
      .then(relatedProducts => {
        let container = {};

        container.relatedProductIds = relatedProducts.data

        const getRelatedProducts = relatedProducts.data.map((relatedId) => {
          return (axios.get(`${API.server}products/${relatedId}`, { headers: {'Authorization': API.gitToken}}))
        })

        const getRelatedStyles = relatedProducts.data.map((relatedId) => {
          return (axios.get(`${API.server}products/${relatedId}/styles`, { headers: {'Authorization': API.gitToken}}))
        })

        const getRelatedReview = relatedProducts.data.map((relatedId) => {
          return (axios.get(`${API.server}reviews/?product_id=${relatedId}`, { headers: {'Authorization': API.gitToken}}))
        })

        Promise.all( getRelatedProducts )
          .then((results) => {
            container.productArrays = results.map((result) => {return result.data})
          })

        Promise.all( getRelatedStyles )
          .then((results) => {
            container.styleArrays = results.map((result) => {return result.data})
          })

          Promise.all( getRelatedReview )
          .then((results) => {
            container.reviewArrays = results.map((result) => {return result.data})
            setRelatedProducts(container)
          })
        })
  }, [])

  return (
    <div>
      <Related>
        <RelatedList relatedProducts={relatedProducts} originalReviews={APIResults.review} originalProductFeatures={APIResults.styles} originalName={APIResults.product.name} ClicksRef={ClicksRef}/>
      </Related>
      <Outfit>
        <OutfitList originalProductID={product_id} ClicksRef={ClicksRef}/>
      </Outfit>
    </div>
  )
}

const Related = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Outfit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`


export default RelatedItemsAndOutfit