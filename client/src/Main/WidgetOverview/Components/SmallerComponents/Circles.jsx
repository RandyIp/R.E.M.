import React from 'react'
import styled from 'styled-components'

const Circles = ({ index, dumbNailArrayIndex, currentImage, setCurrentImage }) => {

  let color = 'grey';
  if (index + 7 * dumbNailArrayIndex === currentImage) { color = 'lightblue' }

  const clicker = () => {
    setCurrentImage(index + dumbNailArrayIndex * 7)
  }
  return (
    <Circle color={color} onClick={clicker}></Circle>
  )
}

const Circle = styled.div`
border-radius:50%;
height: 3rem;
width:3rem;
margin:1rem;
background-color:${props => props.color};
cursor: pointer;
`
export default Circles