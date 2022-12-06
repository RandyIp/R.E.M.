import React from 'react'
import { useState, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import API from '../../../API.js'
import Select from "react-select"
import toast, { Toaster } from 'react-hot-toast';

const AddtoCart = ({ styleArray, style, productName, ClicksRef }) => {

  // ----------------------- Set Up -----------------------
  // set a size state and quantity state
  const [size, setSize] = useState({ value: 0, label: 'Select Size' })
  const [quantity, setQuantity] = useState('')
  const [validSize, setValidSize] = useState(true)

  const sizeSelectRef = useRef()

  // create an array that contains related information
  let cartInfo = Object.values(styleArray[style].skus) || [];
  for (let i = 0; i < cartInfo.length; i++) {
    cartInfo[i].sku_id = Object.keys(styleArray[style].skus)[i]
  }
  cartInfo.unshift({ size: 'Select Size' })

  // set up size options
  let sizeOptions = [];
  for (let i in cartInfo) {
    sizeOptions.push({ value: parseInt(i), label: cartInfo[i].size })
  }

  // create a quantity options and cut off at 15
  let quantityOptions = [];
  for (let i = 1; i <= cartInfo[size.value].quantity; i++) {
    quantityOptions.push({ value: i, label: i })
  }
  if (quantityOptions.length > 15) { quantityOptions = quantityOptions.slice(0, 15) }

  // check total stock
  let stock = 0;
  for (let i = 1; i < cartInfo.length; i++) {
    stock += cartInfo[i].quantity
  }

  let disable = ''
  if (!stock) { disable = 'disabled' }
  // set up sku id to use in post request
  const sku_id = cartInfo[size.value].sku_id

  // ----------------------- Functions -----------------------

  //onchange function for quantity
  const quantityOnChange = (e) => {
    setQuantity(e)
  }

  // onchange function for size
  const sizeOnChange = (e) => {
    setSize(e);
    if (e.value === 0) { setQuantity({ value: 0, label: '-' }) }
    else { setQuantity({ value: 1, label: 1 }) }
  }

  // add to cart button
  const addToCart = (e) => {
    e.preventDefault()
    if (size.value === 0) {
      setValidSize(false)
      sizeSelectRef.current.focus()
    } else {
      for (let i = 0; i < quantity.value; i++) {
        axios.post(API.server + 'cart', { sku_id: sku_id }, { headers: { 'Authorization': API.gitToken } })
          .catch(err => console.log(err))
      }
      setValidSize(true)
      toast.success('Successfully added ' + quantity.value + ' ' + productName + '(s) to cart!')
    }
  }

  // ----------------------- Return Div -----------------------

  // if out of stock, say out of stock
  // set up an indexCounter for entries
  let indexCounter = 0;
  return (<ContainerAddToCart onClick={() => ClicksRef.current.addClicks('overview', 'addToCart')}>

    {/* SELECT SIZE */}
    {validSize && <SmallWords>Size:</SmallWords>}
    {!validSize && <InvalidSize>Please select a size:</InvalidSize>}

    {!stock && <SizeSelect value={{ value: 0, label: 'OUT OF STOCK' }} isDisabled={true} />}
    {stock && <SizeSelect onChange={sizeOnChange} openMenuOnFocus={true} ref={sizeSelectRef} options={sizeOptions} value={size} />}

    {/* SELECT QUANTITY */}
    <SmallWords>Quantity:</SmallWords>
    {size.value === 0 && <QuantitySelect value={{ value: 0, label: '-' }} isDisabled={true} />}
    {size.value !== 0 && <QuantitySelect value={quantity} onChange={quantityOnChange} options={quantityOptions} />}

    {/* ADD TO CART */}
    <AddToCartButton onClick={addToCart} disabled={disable}>
      <ContainerCart>
        <FontAwesomeIcon icon={icon({ name: 'cart-plus' })} />
      </ContainerCart>
      Add to Cart
    </AddToCartButton>
    <Toaster />
  </ContainerAddToCart>)
}

// ----------------------- Styled Components -----------------------
const ContainerAddToCart = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem
`

const InvalidSize = styled.p`
color:red
`
const SizeSelect = styled(Select)`
  padding: 0.25rem 0 0.25rem 0.5rem;
  margin: 0 0 1rem 0;
`

const QuantitySelect = styled(Select)`
  padding: 0.25rem 0 0.25rem 0.5rem;
  margin: 0 0 1rem 0;
`

const AddToCartButton = styled.button`
  background-color: orange;
  padding: .5rem 0;
  cursor: ${props => props.disabled === '' ? `pointer` : `not-allowed`}
`

const ContainerCart = styled.div`
  float: left;
  margin: 0 0 0 0.25rem;
`
const SmallWords = styled.p`
  margin: 0.25rem 0.25rem 0 0.25rem
`
export default AddtoCart