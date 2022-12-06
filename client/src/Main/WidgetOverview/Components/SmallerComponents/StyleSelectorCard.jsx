import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const StyleSelectorCard = ({ entry, style, setStyle, index }) => {
  if (index === style) {
    return (
      <SelectedContainer>
        <SelectedStyleDumbNail src={entry.thumbnail_url}></SelectedStyleDumbNail>
        <CheckContainer>
          <FontAwesomeIcon icon={icon({ name: 'circle-check' })} />
        </CheckContainer>
      </SelectedContainer>
    )
  } else {
    return (
      <SelectedContainer>
        <StyleDumbNail src={entry.thumbnail_url} onClick={() => setStyle(index)}></StyleDumbNail>
        <CheckContainer>
        </CheckContainer>
      </SelectedContainer>)
  }
}

const StyleDumbNail = styled.img`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  cursor: pointer;
  margin: 0.5rem;
`
const SelectedStyleDumbNail = styled.img`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  margin: 0.5rem;
`

const SelectedContainer = styled.div`
position:relative;
`

const CheckContainer = styled.div`
color:green;
position:absolute;
top:0;
right:0
`

export default StyleSelectorCard