import React, { useEffect, useState } from 'react';
import OutfitCard from './OutfitCard.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const OutfitList = ({ originalProductID, ClicksRef}) => {

  const [outfitList,  setOutfitList] = useState();
  const [listUpdater, setListUpdater] = useState(true);
  const idContainer = [];

  useEffect(() => {
    getKeys(localStorage)
  }, [listUpdater])

  const getKeys = (localStorage) => {
    let idContainer = [];
    for (var key in localStorage) {
      idContainer.push(key)
    }
     return setOutfitList(idContainer.splice(0, localStorage.length))
  }

  const removeKeys = (deleteKey) => {
    localStorage.removeItem(deleteKey);
    getKeys(localStorage)
  }

  return (
    <div onClick={() => ClicksRef.current.addClicks('RelatedCards', 'yourOutfitList')}>
      <Header><h2>Outfit List</h2></Header>

      <OutfitCardsContainer>
        <AddOutfitContainer onClick={() => (localStorage.setItem(originalProductID, originalProductID), setListUpdater(!listUpdater))}>
          <AddOutfitText>
            <h2>Add To Outfit</h2>
          </AddOutfitText>

          <AddOutfit>
            <FontAwesomeIcon icon={icon({ name: 'plus' })}/>
          </AddOutfit>
        </AddOutfitContainer>

        <OutfitListContainer>
        {(outfitList) ? outfitList.map((outfit) => <OutfitCard outfit={outfit} removeKeys={removeKeys}/>) : <p>Add Some Outfits</p>}
        </OutfitListContainer>

      </OutfitCardsContainer>

    </div>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`


const OutfitCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const AddOutfit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 300%;
`
const AddOutfitContainer = styled.div`
  border-style: dotted;
  display: block;
  margin: 20px;
  height: 373.66px;
  width: 242px;
`

const OutfitListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`

const AddOutfitText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 100%;
  align: center;
`



export default OutfitList