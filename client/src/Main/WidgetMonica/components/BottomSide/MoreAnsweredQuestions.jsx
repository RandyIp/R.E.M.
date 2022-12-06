import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MoreAnsweredQuestions = (props) => {
  // console.log('the whole current questions we got', props)
  if(props.questions.length <= 2 || props.questionNumber >= Math.min(props.questions.length,20)) {
    return null;
  }

  var handleLoadMore = function () {
    var current = props.questionNumber;
    props.setQuestionNumber(current+2)
  }

  return(
    <div onClick={() => props.ClicksRef.current.addClicks('QASession', 'viewQuestions')}>
      <MoreAnsweredButton onClick={handleLoadMore}>More Answered Questions</MoreAnsweredButton>
    </div>
  )
}
const MoreAnsweredButton = styled.button`
  display: flex;
  width: 200px;
  margin-left: 5%;
  text-indent: 20px;
  background-color: orange;
  padding: .5rem 0;
  justify-content: left;
`

export default MoreAnsweredQuestions;