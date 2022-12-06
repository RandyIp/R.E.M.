import React, {useState, useEffect} from 'react';
import axios from 'axios';
import gitToken from '../../../../hidden.js'
import Modal from './ModalAnswer.jsx';
import styled from 'styled-components';

const AddAnswer = (props) => {
  const [isOpen,setIsOpen] = useState(false)
  const [productname, setProductname] = useState('')
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${props.productid}`,
    { headers: { "Authorization": gitToken } })
    .then((response) => {
      // console.log('here is addAnswered', response.data)
      setProductname(response.data.name)
    })
    .catch((err) => {
      console.log(err);
    })
  },[props.productid])

  return (
    <div onClick={() => props.ClicksRef.current.addClicks('QASession', 'answerQuestion')}>
      <AddAnswerLink href="" onClick={(e) => {e.preventDefault();setIsOpen(true)}}>add answer</AddAnswerLink>
      <Modal
        productname={productname}
        questionbody={props.questionbody}
        questionid={props.questionid}
        open={isOpen}
        displayAnswer={props.displayAnswer}
        setDisplayAnswer={props.setDisplayAnswer}
        answerHelpfulness={props.answerHelpfulness}
        setAnswerHelpfulness={props.setAnswerHelpfulness}
        onClose={() => setIsOpen(false)}
      ></Modal>
    </div>
  )
}

const AddAnswerLink = styled.a`
  color: lightblue;
  :hover {
  color:  black;
  cursor: pointer;
`

export default AddAnswer;