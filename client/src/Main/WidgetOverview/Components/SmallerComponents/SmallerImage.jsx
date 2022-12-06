import React from 'react'
import styled from 'styled-components'

const SmallerImage = ({ entry, index, dumbNailArrayIndex, currentImage, setCurrentImage }) => {
  const clicker = () => {
    setCurrentImage(index + 7 * dumbNailArrayIndex)
  }

  if (index + 7 * dumbNailArrayIndex === currentImage) {
    return <SelectedDumbNail src={entry.thumbnail_url}></SelectedDumbNail>
  } else {
    return (<DumbNail src={entry.thumbnail_url} onClick={clicker}></DumbNail>)
  }
}

const DumbNail = styled.img`
  height: 4rem;
  width: 3rem;
  object-fit: cover;
  margin: 0.5rem;
  box-shadow: 0.4rem 0.4rem black;
  cursor: pointer;
`;

const SelectedDumbNail = styled.img`
  height: 4rem;
  width: 3rem;
  object-fit: cover;
  border-color: green;
  border-style: groove;
  border-width: thick;
  margin: 0.5rem;
`;

export default SmallerImage