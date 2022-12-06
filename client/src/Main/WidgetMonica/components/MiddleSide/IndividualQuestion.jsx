import React, { useState, useEffect } from 'react';
import AddAnswer from './AddAnswer.jsx';
import Answers from './Answers.jsx';
import axios from 'axios'
import gitToken from '../../../../hidden.js'
import styled from 'styled-components';


const IndividualQuestion = (props) => {
  // console.log('individual q', props)
  // console.log('props.question', props.question)
  if(!props.question) {
    return null;
  }

  const [questionHelpfulness, setQuestionHelpfulness] = useState(props.question.question_helpfulness)//it's a number
  const [answerHelpfulness, setAnswerHelpfulness] = useState({})//object{answerid: helpfulness}
  const [isReport, setIsReport] = useState({})
  const [displayAnswer, setDisplayAnswer] = useState([])

  //sorting answer by seller name
  var sortingAnswer = function (displayAnswer) {
    var res = displayAnswer.slice();
    var resOthers = []
    var resSeller = [];
    for (var j = 0; j <res.length; j++) {
      if(res[j].answerer_name === 'seller' || res[j].answerer_name === 'Seller' || res[j].answerer_name === 'SELLER') {
        resSeller.push(res[j])
      } else {
        resOthers.push(res[j])
      }
    }
    // sorting answer by helpfulness
    var sortingAll = function (res) {
      res.sort(function(a,b){
        return a.helpfulness > b.helpfulness ? -1 : a.helpfulness < b.helpfulness ? 1 : 0;
      });
      return res;
    }
    var sortedOthers = sortingAll(resOthers);
    var sortedSeller = sortingAll(resSeller);
    var finalRes = sortedSeller.concat(sortedOthers);
    return finalRes;
  }

  useEffect(() => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.question.question_id}/answers?count=100`,
      headers: {
        'Authorization': gitToken
      },
      method: 'get'
    };
    axios(options)
      .then((response) => {
        var sortedAnswers = sortingAnswer(response.data.results);
        var helpful = {}
        var reportState = {}
        sortedAnswers.forEach((each) => {
          helpful[each.answer_id] = each.helpfulness
          reportState[each.answer_id] = false;
        })
        setAnswerHelpfulness(helpful);
        setDisplayAnswer(sortedAnswers);
        setIsReport(reportState);
      })
      .catch((err) => {
        console.log(err);
      })
   },[props.question.question_id])

  var handleHelpful = function (e, id) {
    e.preventDefault();
    if(e.target.disabled === true) {
      return;
    }
    var currentState = questionHelpfulness +1;
    setQuestionHelpfulness(currentState);
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/helpful`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      // console.log('update question helpful succeed')
    }).catch((err) => {
      console.log('there is an error in your update question helpful', err);
    })
    e.target.disabled = true
  }

  return (

    <div>
      <QuestionContainer>
        <QuestionBody>
          <QuestionContent>Q: {props.question.question_body}</QuestionContent>
        </QuestionBody>
        <HelpfulQuesVote>
          <div>Helpful?&nbsp;</div>
          <Vote href="" onClick={(e) => {handleHelpful(e, props.question.question_id)}}> Yes&nbsp;</Vote>
          <div>{questionHelpfulness}&nbsp;&nbsp;|&nbsp;&nbsp;</div>
          <AddAnswer
            productid={props.productid}
            questionbody={props.question.question_body}
            questionid={props.question.question_id}
            displayAnswer={displayAnswer}
            setDisplayAnswer={setDisplayAnswer}
            answerHelpfulness={answerHelpfulness}
            setAnswerHelpfulness={setAnswerHelpfulness}
            isReport={isReport}
            setIsReport={setIsReport}
            ClicksRef={props.ClicksRef}
            >
          </AddAnswer>
        </HelpfulQuesVote>
      </QuestionContainer>
      <br></br>
      <Answers
        questionid={props.question.question_id}
        displayAnswer={displayAnswer}
        setDisplayAnswer={setDisplayAnswer}
        answerHelpfulness={answerHelpfulness}
        setAnswerHelpfulness={setAnswerHelpfulness}
        isReport={isReport}
        setIsReport={setIsReport}
      ></Answers>
    </div>

  )

}

const QuestionBody = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 50%;
  margin-left: 10%;
`
const HelpfulQuesVote = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: right;
  width: 50%;

  font-size: 1.17em;
`// margin-right: 12%;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const QuestionContent = styled.div`
  display: flex;
  font-size: 1.17em;
  font-weight: bold;
`
const Vote = styled.a`
  color: lightblue;
  :hover {
  color:  black;
  cursor: pointer;
};
`
export default IndividualQuestion;