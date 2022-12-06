import React, {useState, useEffect} from 'react';
import axios from 'axios';
import cors from 'cors';
import styled from 'styled-components';


const FORM_STYLES = {
  height: '35.5px',
  width: '800px'
}

const SearchBar = (props) => {

var handleEntry = function (e) {
  props.setEntry(e.target.value);
  // console.log('take a look',e.target.value )
  if(e.target.value.length < 3) {
    props.setQuestionNumber(2)
  }
  // console.log('take a look again', props.questionNumber )
}
  return (
       <form>
        <input style={FORM_STYLES} value={props.entry} onChange={handleEntry} placeholder='Have a question? Search for answers…' size="50" onClick={() => props.ClicksRef.current.addClicks('QASession', 'searchQuestion')}></input>
       </form>
  )

}

export default SearchBar;