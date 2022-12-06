import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const MODAL_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0, .7)',
  zIndex: 1000
}

const ProductComparison = ({ sortedProduct, originalProductFeatures, rating, close, originalName, originalReviews }) => {

  const findFeaturevalue = () => {
    sortedProduct.styleArray
  }

  const getSizes = (productStyle) => {
    let sizes = productStyle.results[0].skus
    let sizeContainer = []
    for (var key in sizes) {
      sizeContainer.push(sizes[key]['size'])
    }
    return sizeContainer
  }

  const getRating = (originalReviews) => {
    let sum = 0;
    for (let i = 0; i < originalReviews.results.length; i++) {
      sum += originalReviews.results[i].rating
    }
    return sum / originalReviews.results.length
  }


  const checkmark = (<FontAwesomeIcon icon={icon({ name: 'check' })}/>)
  return (
    <>
    <div style={OVERLAY_STYLES}/>
    <div className ="modelBackGround" style={MODAL_STYLE}>
      <div>
        <DeleteButtonContainer onClick={() => close()}>
          <FontAwesomeIcon icon={icon({ name: 'x' })}/>
        </DeleteButtonContainer>
        <table>
        <tbody>
          <tr>
            <th>
              <Header>{originalName}</Header>
            </th>
            <th>
              <Header>Characteristic</Header>
            </th>
            <th>
              <Header>{sortedProduct.productArray.name}</Header>
            </th>
          </tr>
          <tr>
            <td>{originalProductFeatures.results[0].sale_price ? <span><Answer>{checkmark}</Answer></span> : <span><Answer>{null}</Answer></span>}</td>
            <td><Answer>On Sale?</Answer></td>
            <td>{sortedProduct.styleArray.results[0].sale_price ? <span><Answer>{checkmark}</Answer></span> : <span><Answer>{null}</Answer></span>}</td>
          </tr>
          <tr>
            <td>{(getSizes(originalProductFeatures).length) > 0 ? <span><Answer>{checkmark}</Answer></span> : <span><Answer>{null}</Answer></span>}</td>
            <td><Answer>Multiple Sizes Available?</Answer></td>
            <td>{(getSizes(sortedProduct.styleArray).length) > 0 ? <span><Answer>{checkmark}</Answer></span> : <span><Answer>{null}</Answer></span>}</td>
          </tr>
          <tr>
            <td>{(originalProductFeatures.results.length > 0) ? <span><Answer>{checkmark}</Answer></span> : <span><Answer>{null}</Answer></span>}</td>
            <td><Answer>Multiple Styles?</Answer></td>
            <td>{(sortedProduct.styleArray.results.length > 0) ? <span><Answer>{checkmark}</Answer></span> : <span><Answer>{null}</Answer></span>}</td>
          </tr>
          <tr>
            <td><Answer>{getRating(originalReviews)}</Answer></td>
            <td><Answer>Rating</Answer></td>
            <td><Answer>{rating}</Answer></td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

const Overview = styled.div`
`

const Header = styled.div`
  text-decoration: underline;
`

const Answer = styled.div`
  text-align: center;
`


const DeleteButtonContainer = styled.div`
  position: relative;
  bottom: 1.7em;
  left: 1em;
  float: right;
`

export default ProductComparison