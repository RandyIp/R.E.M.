import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../API.js';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const OutfitCard = ({ rating }) => {

  let avg = rating;

  // creating array to map stars over
  let starCount = parseInt(avg)
  const starArray = [...Array(starCount).keys()]

  // check for float, round to nearest 0.25
  let [remainderStar, leftGradient, rightGradient] = [avg - starCount, 0, 0]
  if (remainderStar <= 0.125) { rightGradient = 100 }
  if (remainderStar > 0.125 && remainderStar <= 0.375) { [leftGradient, rightGradient] = [25, 25] }
  if (remainderStar > 0.375 && remainderStar <= 0.625) { [leftGradient, rightGradient] = [50, 50] }
  if (remainderStar > 0.625 && remainderStar <= 0.875) { [leftGradient, rightGradient] = [75, 75] }

  // creating 'empty' star array
  let emptyStarArray = []
  if (Math.ceil(avg) < 5) {
    emptyStarArray = [...Array(5 - Math.ceil(avg)).keys()]
  }

  return (
    <>
    <div>
      <StarContainer>
        {starArray.map(entry => (
          <FontAwesomeIcon icon={icon({ name: 'star' })} />
        ))}
        {remainderStar > 0 && <Star className="fa-solid fa-star" left={leftGradient} right={rightGradient} />}
        {emptyStarArray.length > 0 && emptyStarArray.map(entry => (
          <Star className="fa-solid fa-star" left={0} right={0} />
        ))}
        <RatingContainer>&#40;{avg}&#41;</RatingContainer>
      </StarContainer>
    </div>
    </>
  )
}

const StarContainer = styled.div`
  display: flex;
  color: orange;
  flex-direction: row;
`

const Star = styled.i`
  background: ${props => `linear-gradient(to right, orange ${props.left}%, grey ${props.right}%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const RatingContainer = styled.div`
  color: black;
  margin-left: 10px;
  opacity: 0.5;
  font-size: 100%;
`


export default OutfitCard