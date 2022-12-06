import React from 'react'
import StyleSelectorCard from './SmallerComponents/StyleSelectorCard.jsx'
import styled from 'styled-components'

const StyleSelector = ({ styleArray, style, setStyle, ClicksRef }) => {
  // create index for each entry
  let count = 0

  // create array of url images of the default image per style
  let URLArray = [];
  for (let i of styleArray) {
    URLArray.push(i.photos[0])
  }
  let RowsOf4 = []
  for (let i = 0; i < URLArray.length; i += 4) {
    RowsOf4.push(URLArray.slice(i, i + 4))
  }

  const selectStyle = (e) => {
    setStyle(e.target.value)
  }

  return (<div onClick={() => ClicksRef.current.addClicks('overview', 'styleSelect')}>
    Style: {styleArray[style].name}
    {RowsOf4.map(RowEntry => (
      <RowContainer>
        {RowEntry.map(entry => (
          <StyleSelectorCard entry={entry} style={style} setStyle={setStyle} index={count++} key={entry.style_id} />
        ))}
      </RowContainer>
    ))}
  </div>)
}

const RowContainer = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr 1fr
`
export default StyleSelector