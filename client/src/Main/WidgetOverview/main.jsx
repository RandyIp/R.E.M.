//imports
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ImageGallery from './Components/ImageGallery.jsx'
import ProductInformation from './Components/ProductInformation.jsx'
import StyleSelector from './Components/StyleSelector.jsx'
import AddtoCart from './Components/AddtoCart.jsx'
import ExpandImage from './Components/SmallerComponents/ExpandImage.jsx'
import SocialMedia from './Components/SmallerComponents/SocialMedia.jsx'
import Select from "react-select"

const OverviewWidget = ({ APIResults, setProductSelector, ClicksRef }) => {
  // set initial style
  const styleArray = APIResults.styles.results || [];
  let defaultStyle = 0;
  for (let i = 0; i < styleArray.length; i++) {
    if (styleArray['default?']) { defaultStyle = i }
  }

  const [style, setStyle] = useState(defaultStyle)
  const [expand, setExpand] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [dumbNailArrayIndex, setDumbNailArrayIndex] = useState(0)

  return (<div>

    {/* Navigation Header */}
    <NavBar>
      <LogoContainer>
        <Header>R.E.M</Header>
        <Slogan>Remember Every Moment</Slogan>
      </LogoContainer>
    </NavBar>
    <EmptySpace></EmptySpace>

    {/* Creates loading text while api is being called  */}
    {APIResults.product.id === undefined && <div>Loading...</div>}

    {/* If image is expanded, conditionally render expanded image  */}
    {APIResults.product.id !== undefined && expand && <ExpandImage setExpand={setExpand} styleArray={styleArray} style={style} currentImage={currentImage} setCurrentImage={setCurrentImage} dumbNailArrayIndex={dumbNailArrayIndex} setDumbNailArrayIndex={setDumbNailArrayIndex} ClicksRef={ClicksRef} />}

    {/* Otherwise, render the image gallery  */}
    {APIResults.product.id !== undefined && !expand && <ContainerGrid>
      <ImageGallery styleArray={styleArray} style={style} setExpand={setExpand} currentImage={currentImage} setCurrentImage={setCurrentImage} dumbNailArrayIndex={dumbNailArrayIndex} setDumbNailArrayIndex={setDumbNailArrayIndex} ClicksRef={ClicksRef} />

      {/* And the product info  */}
      <CointainerProductInfo>
        <ProductInformation APIResults={APIResults} style={style} ClicksRef={ClicksRef} />
        <StyleSelector styleArray={styleArray} style={style} setStyle={setStyle} ClicksRef={ClicksRef} />
        <AddtoCart styleArray={styleArray} style={style} productName={APIResults.product.name} ClicksRef={ClicksRef} />
        <SocialMedia />
      </CointainerProductInfo>
    </ContainerGrid>}
  </div>)
}

const NavBar = styled.div`
  background-color:lightblue;
  position: fixed;
  top: 0;
  width: 100%;
  height: 4rem;
  z-index: 2;
`

const LogoContainer = styled.div`
`

const Header = styled.h1`
  top: 0;
  margin: 0;
  font-family: 'Brush Script Std';
`
const Slogan = styled.p`
  top: 0;
  margin: 0;
  font-family: 'Snell Roundhand';
`

const EmptySpace = styled.div`
  height: 3.6rem;
`

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr;
`

const CointainerProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default OverviewWidget