import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const SocialMedia = () => {
  return (
    <SocialMediaContainer>
      <FontAwesomeIcon icon={brands('facebook')} onClick={() => window.open('https://www.facebook.com/', '_blank')} />
      <FontAwesomeIcon icon={brands('twitter')} onClick={() => window.open('https://www.twitter.com/', '_blank')} />
      <FontAwesomeIcon icon={brands('pinterest')} onClick={() => window.open('https://www.pinterest.com/', '_blank')} />
    </SocialMediaContainer>
  )
}

const SocialMediaContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 2rem 2rem ;
  color: lightblue;
  font-size: xx-large;
  grid-gap: 2rem;
  cursor: pointer;
  margin: 0.25rem 2rem;
`
export default SocialMedia