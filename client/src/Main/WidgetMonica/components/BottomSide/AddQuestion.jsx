import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from './ModalQuestion.jsx';
import gitToken from '../../../../hidden.js';
import styled from 'styled-components';

const AddQuestion = (props) => {
  const [isOpen,setIsOpen] = useState(false)
  const [productname, setProductname] = useState('')
  // console.log('Add question props', props)
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${props.productid}`,
    { headers: { "Authorization": gitToken } })
    .then((response) => {
      setProductname(response.data.name)
    })
    .catch((err) => {
      console.log(err);
    })
  },[props.productid])

  return(
    <div  onClick={() => props.ClicksRef.current.addClicks('QASession', 'addQuestion')}>
        <AddQContainer onClick={(e) => {e.preventDefault();setIsOpen(true)}}>Add a question +</AddQContainer>
        <Modal
        productid={props.productid}
        productname={productname}
        open={isOpen}
        questions={props.questions}
        setQuestions={props.setQuestions}
        onClose={() => setIsOpen(false)}
        ></Modal>
    </div>

  )
}
const AddQContainer = styled.button`
  display: flex;
  width: 200px;
  margin: center;
  text-indent: 40px;
  background-color: orange;
  padding: .5rem 0;
`

export default AddQuestion;