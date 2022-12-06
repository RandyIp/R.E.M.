// imports
import React from 'react'
import { useState } from 'react'
import SmallerImage from './SmallerComponents/SmallerImage.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const ImageGallery = ({ styleArray, style, setExpand, currentImage, setCurrentImage, dumbNailArrayIndex, setDumbNailArrayIndex, ClicksRef }) => {
  // ---------------------- Set Up ----------------------
  // setting up index count
  let count = 0

  // create thumbnail arrays
  let photosArray = styleArray[style].photos;
  let dumbNailArray = [];
  for (let i = 0; i <= photosArray.length; i += 7) {
    dumbNailArray.push(photosArray.slice(i, i + 7))
  }

  // ---------------------- Functions ----------------------

  // Arrows
  const upArrowClick = () => {
    if (dumbNailArrayIndex > 0) {
      setDumbNailArrayIndex(dumbNailArrayIndex - 1)
      setCurrentImage((dumbNailArrayIndex - 1) * 7)
    }
  }

  const downArrowClick = () => {
    if (dumbNailArrayIndex < dumbNailArray.length - 1) {
      setDumbNailArrayIndex(dumbNailArrayIndex + 1)
      setCurrentImage((dumbNailArrayIndex + 1) * 7)
    }
  }

  const leftArrowClick = () => {
    if (currentImage === 0) { return }
    setCurrentImage(currentImage - 1)
    if ((currentImage) % 7 === 0) { setDumbNailArrayIndex(dumbNailArrayIndex - 1) }
  }

  const rightArrowClick = () => {
    if (currentImage < styleArray[style].photos.length - 1) { setCurrentImage(currentImage + 1) }
    if ((currentImage + 1) % 7 === 0) { setDumbNailArrayIndex(dumbNailArrayIndex + 1) }
  }
  // ---------------------- HTML ----------------------
  return (<ContainerImage onClick={() => ClicksRef.current.addClicks('overview', 'imageGallery')}>
    {/* map over remainder of entries to smaller images */}
    <DumbNails>
      <ContainerUp end={dumbNailArrayIndex} onClick={upArrowClick}>
        <FontAwesomeIcon icon={icon({ name: 'angle-up' })} />
      </ContainerUp>
      {dumbNailArray[dumbNailArrayIndex].map(entry => (
        <SmallerImage entry={entry} index={count++} setCurrentImage={setCurrentImage} currentImage={currentImage} dumbNailArrayIndex={dumbNailArrayIndex} key={count} />
      ))}
      <ContainerDown end={dumbNailArrayIndex} length={dumbNailArray.length} onClick={downArrowClick}>
        <FontAwesomeIcon icon={icon({ name: 'angle-down' })} />
      </ContainerDown>
    </DumbNails>

    {/* main picture */}
    <MainDisplay>
      {currentImage === 0 && <EmptyDiv />}
      {currentImage !== 0 && <ContainerLeftArrow onClick={leftArrowClick}>
        <FontAwesomeIcon icon={icon({ name: 'circle-arrow-left' })} />
      </ContainerLeftArrow>}

      <MainImage src={styleArray[style].photos[currentImage].url}></MainImage>

      {currentImage !== photosArray.length - 1 && <ContainerRightArrow onClick={rightArrowClick}>
        <FontAwesomeIcon icon={icon({ name: 'circle-arrow-right' })} />
      </ContainerRightArrow>}

      <ContainerExpand onClick={() => setExpand(true)}>
        <FontAwesomeIcon icon={icon({ name: 'expand' })} />
      </ContainerExpand>
    </MainDisplay>
  </ContainerImage>)
}

// ---------------------- Style ----------------------
const DumbNails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40rem;
  z-index: 1;
`;

const MainDisplay = styled.div`
display: flex;
align-items: center;
position: relative
`
const MainImage = styled.img`
height: 40rem;
width: 40rem;
object-fit: contain;
`

const ContainerImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr
`

const ContainerExpand = styled.div`
position: absolute;
top: 0;
right: 0;
z-index: 1;
color: grey;
font-size: x-large;
margin-right: 2rem;
cursor: pointer;
`

const ContainerUp = styled.div`
  color: grey;
  text-align: center;
  font-size: large;
  margin: 0.5rem;
  cursor: ${props => props.end === 0 ? `no-drop` : `pointer`}
`

const ContainerDown = styled.div`
color: grey;
text-align: center;
font-size: large;
margin: 0.9rem;
cursor: ${props => props.end === props.length - 1 ? `no-drop` : `pointer`}
`

const ContainerLeftArrow = styled.div`
float: left;
color: grey;
font-size: x-large;
cursor: pointer;
`

const ContainerRightArrow = styled.div`
float: right;
color: grey;
font-size: x-large;
cursor: pointer;
`

const EmptyDiv = styled.div`
width: 3.5%
`
export default ImageGallery