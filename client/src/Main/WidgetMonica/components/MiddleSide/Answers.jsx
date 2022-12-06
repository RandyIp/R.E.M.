import React, {useState, useEffect} from 'react';
import axios from 'axios';
import gitToken from '../../../../hidden.js'
import styled from 'styled-components';

var Answers = function (props) {

  const[answerNumber, setAnswerNumber] =useState(2);

  // use filter to set up a final showing answer list, use answernumber to controller showing answer's number
  var filter = function (number, all) {
    var res = [];
    for (var i = 0; i < Math.min(number,all.length); i++) {
      res.push(all[i]);
    }
    return res;
  }

  var handleloadmore = function () {
    event.preventDefault()
    // console.log('take a look', answerNumber, 'and', props.displayAnswer.length)
    var current = answerNumber;
    setAnswerNumber(current+5)
    if(answerNumber >= props.displayAnswer.length) {
      setAnswerNumber(2)
    }
  }

  var handleHelpful = function (e, id) {
    e.preventDefault()
    if(e.target.disabled === true) {
      return;
    }
    //copy helpfulness state object
    var newState =JSON.parse(JSON.stringify(props.answerHelpfulness));
    newState[id] = newState[id]+1;
    props.setAnswerHelpfulness(newState);
    //update database helpfulness of this answer
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/helpful`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      console.log('update answer helpful succeed')
    }).catch((err) => {
      console.log('there is an error in your update answer helpful', err);
    })
    // console.log('event', e)
    e.target.disabled = true
  }

  var handleReport = function (e, id) {
    e.preventDefault()
    //pay attention to the second param in put request vs post request
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/report`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      // console.log('report succeed')
      //copy isreport object
      var newState =JSON.parse(JSON.stringify(props.isReport));
      newState[id] = true;
      props.setIsReport(newState);
    }).catch((err) => {
      console.log('there is an error in report answer', err);
    })
  }

    return (
    <div key={props.questionid}>
      {
      // use filter to control the total showing answer number, display answer is the whole total sorted answers get from API, set max to 100
      filter(answerNumber, props.displayAnswer).map((each, index) => {
        return(
        <MainContainer>
          <AnswerContainer key={index}>
            <AnswerInfo>
              <br></br>
              <AnswerBody>
                <AnswerContent>A:&nbsp;</AnswerContent>
                {each.body}
              </AnswerBody>
              <br></br>
              <HelpfulAnsVote>
                <div>by {each.answerer_name.toLowerCase() === 'seller' ? <b>{each.answerer_name}</b> : each.answerer_name}&nbsp;&nbsp;&nbsp;</div>
                <div>{new Date(each.date.slice(0,10)).toUTCString().substring(0, 16)}&nbsp;&nbsp;&nbsp;</div>
                <div>Helpful?&nbsp;</div>
                <Vote href="" onClick={(e) => {handleHelpful(e, each.answer_id)}}>Yes&nbsp;</Vote>
                <div>{props.answerHelpfulness[each.answer_id]}&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                <div>
                  {props.isReport && !props.isReport[each.answer_id] && <ReportTarget href="" onClick={(e) => {handleReport(e, each.answer_id)}}>Report</ReportTarget>}
                  {props.isReport && props.isReport[each.answer_id] && <div>Reported</div>}
                </div>
              </HelpfulAnsVote>
            </AnswerInfo>
            <Answerpic>
                {
                  each.photos&&(each.photos).map((eachPhoto) => (
                    <Picture src={eachPhoto.url} ></Picture> // style={{width:400, height:300}}
                  ))
                }
            </Answerpic>
          </AnswerContainer>
        </MainContainer>
        )
      })}
      <MoreAnswerLink href="" onClick={handleloadmore}> {answerNumber >= props.displayAnswer.length ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWER'}</MoreAnswerLink>
    </div>
    )
}
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Answerpic = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
`
const Picture = styled.img`
  display: inline-block;
  margin:10px 0 0 10px;
  flex-grow: 1;
  height: calc(100% * (1/4) - 10px - 1px) / 4 * 3;
  width: calc(100% * (1/4) - 10px - 1px)
`


const AnswerContent = styled.div`
  font-weight: bold;
`

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const AnswerBody = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 50%;
  margin-left: 10%;
  margin-top: auto;
  font-size: 1.17em;
`
const HelpfulAnsVote = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: right;
  width:50%;
  font-size: 1em;

`
const AnswerInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

`
const MoreAnswerLink = styled.a`
  display: flex;
  color: lightblue;
  padding: .5rem 0;
  width: 200px;
  margin-left: 10%;
  text-indent: 25px;
  :hover {
    color:  black;
    cursor: pointer;
  };
`
const Vote = styled.a`
  color: lightblue;
  :hover {
  color:  black;
  cursor: pointer;
};
`
const ReportTarget = styled.a`
  color: lightblue;
    :hover {
    color:  black;
    cursor: pointer;
  };
`
export default Answers;
