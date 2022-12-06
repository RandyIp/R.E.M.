import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import QuestionsList from './components/MiddleSide/QuestionsList.jsx';
import SearchBar from './components/FrontSide/SearchBar.jsx';
import AddQuestion from './components/BottomSide/AddQuestion.jsx';
import MoreAnsweredQuestions from './components/BottomSide/MoreAnsweredQuestions.jsx';
import styled from 'styled-components';
import gitToken from '../../hidden.js';// dotenv substitute


const MainMonica = ({ product_id, ClicksRef }) => {
  // console.log('QA part', product_id)
  const [questions, setQuestions] = useState([])
  const [questionNumber, setQuestionNumber] = useState(2)
  const [entry, setEntry] = useState('');

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product_id}&count=300`,
      { headers: { "Authorization": gitToken } })
      .then((response) => {
        // console.log('Injected response of product',product_id, response)
        setQuestions(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [product_id])

  // do the filter for how many questions we want to get
  var filterByNumber = function (number, all) {
    var res = [];
    for (var i = 0; i < Math.min(number, all.length); i++) {
      res.push(all[i]);
    }
    return res;
  }

  // do the filter for search bar part
  var filterByContent = function (content, questions) {
    // console.log(' for search content', questions)
    if (content.length < 3) {
      return questions;
    }
    var res = [];
    for (var i = 0; i < questions.length; i++) {
      var searchedContent = content.toLowerCase()
      if (questions[i]['question_body'].toLowerCase().includes(searchedContent)) {
        res.push(questions[i]);
      }
    }
    // console.log('searched content', res)
    return res;
  }

  return (<QAsection>
    <CointainerQuestionsInfo>
      <h1> Questions & Answers</h1>
      <div>
        <SearchBar entry={entry} setEntry={setEntry} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} ClicksRef={ClicksRef}></SearchBar>
      </div>
    </CointainerQuestionsInfo>
    <br></br>
    <ContainerQuestionList>
      {/*filter the content at first, then filter by number */}
      <QuestionsList questions={filterByNumber(questionNumber, filterByContent(entry, questions))} productid={product_id} ClicksRef={ClicksRef}></QuestionsList>
    </ContainerQuestionList>
    <br></br>
    <BottomPart>
      <MoreAnsweredQuestions questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} questions={filterByContent(entry, questions)} ClicksRef={ClicksRef}></MoreAnsweredQuestions>
      <AddQuestion productid={product_id} questions={questions} setQuestions={setQuestions} ClicksRef={ClicksRef}></AddQuestion>
    </BottomPart>
    <br></br>
  </QAsection>)
}

const QAsection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;

`
const CointainerQuestionsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContainerQuestionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`
const BottomPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`
export default MainMonica