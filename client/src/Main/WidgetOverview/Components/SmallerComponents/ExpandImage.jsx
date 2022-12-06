import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Circles from './Circles.jsx'
import PrismaZoom from 'react-prismazoom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const ExpandImage = ({ setExpand, styleArray, style, currentImage, setCurrentImage, dumbNailArrayIndex, setDumbNailArrayIndex, ClicksRef }) => {

  const [zoom, setZoom] = useState(false)

  // set up circle arrays
  let circleIndex = 0;
  let photoArray = [...Array(styleArray[style].photos.length).keys()]
  let circleArray = [];
  for (let i = 0; i <= photoArray.length; i += 7) {
    circleArray.push(photoArray.slice(i, i + 7))
  }

  // ---------------- Functions ----------------

  const zoomInDblClick = (e) => {
    ClicksRef.current.addClicks('overview', 'imageGallery')
    if (e.detail === 2) setZoom(true)
  }

  const zoomOutDblClick = (e) => {
    ClicksRef.current.addClicks('overview', 'imageGallery')
    if (e.detail === 2) setZoom(false)
  }

  const upArrowClick = () => {
    if (dumbNailArrayIndex > 0) {
      setDumbNailArrayIndex(dumbNailArrayIndex - 1)
      setCurrentImage((dumbNailArrayIndex - 1) * 7)
    }
  }

  const downArrowClick = () => {
    if (dumbNailArrayIndex < circleArray.length - 1) {
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

  if (zoom) {
    return (
      <ContainerExpandImage onClick={zoomOutDblClick}>
        <PrismaZoom maxZoom={2.5} scrollVelocity={0}>
          <ExpandedImage src={styleArray[style].photos[currentImage].url} zoom={zoom}></ExpandedImage>
        </PrismaZoom>
      </ContainerExpandImage>
    )
  } else {
    return (
      <ContainerExpandImage>
        <PrismaZoom maxZoom={2.5} scrollVelocity={0}>
          <ExpandedImage src={styleArray[style].photos[currentImage].url} onClick={zoomInDblClick} zoom={zoom}></ExpandedImage>
        </PrismaZoom>
        <ContainerCircles>

          <ContainerUp onClick={upArrowClick}>
            <FontAwesomeIcon icon={icon({ name: 'angle-up' })} />
          </ContainerUp>

          {circleArray[dumbNailArrayIndex].map(entry => (
            <Circles index={circleIndex++} dumbNailArrayIndex={dumbNailArrayIndex} currentImage={currentImage} setCurrentImage={setCurrentImage} />
          ))}

          <ContainerDown onClick={downArrowClick}>
            <FontAwesomeIcon icon={icon({ name: 'angle-down' })} />
          </ContainerDown>
        </ContainerCircles>

        <ContainerLeftArrow onClick={leftArrowClick}>
          <FontAwesomeIcon icon={icon({ name: 'circle-arrow-left' })} />
        </ContainerLeftArrow>

        <ContainerRightArrow onClick={rightArrowClick}>
          <FontAwesomeIcon icon={icon({ name: 'circle-arrow-right' })} />
        </ContainerRightArrow>

        <ContainerX onClick={() => setExpand(false)}>
          <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
        </ContainerX>

      </ContainerExpandImage >
    )
  }
}

const ContainerExpandImage = styled.div`
  width:100%;
  height:40rem;
  position:relative;
`

const ExpandedImage = styled.img`
  width:100%;
  height:40rem;
  object-fit: contain;
  cursor: ${props => props.zoom ? `zoom-out` : `zoom-in`};
`

const ContainerCircles = styled.div`
  display: flex;
  flex-direction: column;
  height: 40rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const ContainerX = styled.div`
right: 1rem;
top: 1rem;
z-index: 1;
position: absolute;
color: grey;
font-size: x-large;
cursor: pointer;
`

const ContainerUp = styled.div`
  color: grey;
  text-align: center;
  font-size: large;
  cursor: pointer;
`

const ContainerDown = styled.div`
color: grey;
text-align: center;
font-size: large;
position: absolute;
bottom: 0;
margin: 0 0 1rem 2rem;
cursor: pointer;
`

const ContainerLeftArrow = styled.div`
position: absolute;
top: 45%;
left: 6rem;
color: grey;
font-size: x-large;
cursor: pointer;
`

const ContainerRightArrow = styled.div`
position: absolute;
top: 45%;
right: 5rem;
color: grey;
font-size: x-large;
cursor: pointer;
`
export default ExpandImage