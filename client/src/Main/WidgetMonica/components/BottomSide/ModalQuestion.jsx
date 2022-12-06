import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import gitToken from '../../../../hidden.js';
import styled from 'styled-components';

const MODAL_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0, .7)',
  zIndex: 1000
}

var sortingAll = function (resArr) {
  resArr.sort(function (a, b) {
    return a.helpfulness > b.helpfulness ? -1 : a.helpfulness < b.helpfulness ? 1 : 0;
  });
  return resArr;
}

function Modal(props) {
  if (props.open === false) {
    return null;
  }
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  var handlesubmit = function (props) {
    event.preventDefault()
    var data = {
      body: body,
      name: name,
      email: email,
      product_id: props.productid
    };
    // console.log(data)
    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', data, { headers: { "Authorization": gitToken } })
      .then(function (response) {
        console.log('your add question request has been succeed');
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${props.productid}&count=300`,
          { headers: { "Authorization": gitToken } })
          .then((response) => {
            sortingAll(response.data.results);
            console.log('refector', sortingAll(response.data.results))
            props.setQuestions(sortingAll(response.data.results))
            setName('');
            setBody('');
            setEmail('');
            props.onClose();
          }).catch((err) => {
            console.log(err);
          })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div className="modelBackGround" style={MODAL_STYLE}>
        <div className="title">
          <h1>Ask Your Question</h1>
          <div className="subtitle">
            <h2>About the {props.productname}</h2>
            <form>
              <label className="required">Your Question *</label>
              <br></br>
              <textarea rows="4" cols="30" maxLength="1000" value={body} onChange={(e) => { setBody(e.target.value) }} required></textarea>
              <br></br>
              <label> What is your nickname *</label>
              <br></br>
              <input type="text" maxLength="60" placeholder="Example: jackson11!" value={name} onChange={(e) => { setName(e.target.value) }} required></input>
              <p><i>"For privacy reasons, do not use your full name or email address”</i> </p>
              <br></br>
              <label>Your email * </label>
              <br></br>
              <input type="text" maxLength="60" placeholder="Why did you like the product or not?" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
              <p><i>“For authentication reasons, you will not be emailed”</i></p>
              <br></br>
              <button onClick={() => { handlesubmit(props) }}>Submit Question</button>
              <button onClick={props.onClose}>cancel</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Modal;