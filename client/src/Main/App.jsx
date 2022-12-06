import React from 'react'
import { useState, useEffect, useRef, Suspense } from 'react'
import styled from 'styled-components'
import RelatedItemsWidget from './RelatedItemsWidget/main.jsx'
import MainMonica from './WidgetMonica/main.jsx'
import OverviewWidget from './WidgetOverview/main.jsx'
import axios from 'axios'
import API from '../API.js'
import Select from "react-select"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

// Shared get requests done at the App level

const App = () => {

  // set up react lazy
  const MainMonica = React.lazy(() => import('./WidgetMonica/main.jsx'))
  const RelatedItemsWidget = React.lazy(() => import('./RelatedItemsWidget/main.jsx'))

  // set up initial ref
  const initialClicks = {
    history: [],
    module: {
      overview: {
        imageGallery: 0,
        productInformation: 0,
        styleSelect: 0,
        addToCart: 0,
        Total: 0
      },
      QASession: {
        addQuestion: 0,
        viewQuestions: 0,
        searchQuestion: 0,
        answerQuestion: 0,
        Total: 0
      },
      RelatedCards: {
        relatedProductCards: 0,
        listBehavior: 0,
        relatedProductList: 0,
        yourOutfitList: 0,
        Total: 0
      }
    },
    addClicks: (mod, ele) => {
      ClicksRef.current.history.push({ time: new Date, module: mod, element: ele })
      ClicksRef.current.module[mod][ele] += 1;
      ClicksRef.current.module[mod].Total += 1;
    }
  }

  const ClicksRef = useRef(initialClicks)

  // set up initial state
  const initialState = {
    product: {},
    review: {},
    styles: {},
  };

  // set state of product, this state contains all info of the product, create context
  const [APIResults, setAPIResults] = useState(initialState)
  const [productSelector, setProductSelector] = useState({ value: 2, label: 2 })
  const [devMode, setDevMode] = useState(true) // to disable dev mode, just set this to false

  let devOptions = []
  const productCount = 10 // change this to match total products being chosen
  for (let i = 0; i < productCount; i++) {
    devOptions.push({ value: i, label: i })
  }

  const devChanger = (e) => {
    setProductSelector(e);
  }

  const clickLogger = () => {
    console.log('Click History:', [...ClicksRef.current.history].reverse())
    console.log('Click Data Breakdown:', ClicksRef.current.module)
  }

  // use effect to get all get requests needed in the beginning.
  useEffect(() => {
    console.log('App axios get request in progress')
    let holder = {}
    axios.get(API.server + 'products/' + '?count=10', { headers: { "Authorization": API.gitToken } })
      .then(productResult => {
        holder.product = productResult.data[productSelector.value]

        // get request for reviews
        const getReview = axios.get(API.server + 'reviews/?product_id=' + productResult.data[productSelector.value].id, { headers: { "Authorization": API.gitToken } })

        // get request for styles
        const getStyles = axios.get(API.server + 'products/' + productResult.data[productSelector.value].id + '/styles', { headers: { "Authorization": API.gitToken } })

        // wait for all axios requests
        Promise.all([getReview, getStyles])
          .then((resultArray) => {
            holder.review = resultArray[0].data
            holder.styles = resultArray[1].data
            setAPIResults(holder)
            console.log('App axios get request completed!')
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [productSelector])

  return (
    <AppContainer>
      <OverviewWidget APIResults={APIResults} setProductSelector={setProductSelector} ClicksRef={ClicksRef} />
      <Suspense fallback={<div>Loading...</div>}>
        {APIResults.product.id ? <MainMonica product_id={APIResults.product.id} ClicksRef={ClicksRef} /> : null}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        {APIResults ? <RelatedItemsWidget APIResults={APIResults} ClicksRef={ClicksRef} /> : null}
      </Suspense>
      {devMode && <ContainerDev>
        Dev Tool:
        <Select value={productSelector} options={devOptions} onChange={devChanger} />
        <button onClick={clickLogger}>log clicks</button>
        <FontAwesomeIcon icon={icon({ name: 'xmark' })} onClick={() => setDevMode(false)} />
      </ContainerDev>}
    </AppContainer>
  )
}

// used to be flex, but then I changed it
const AppContainer = styled.div`
`;

const ContainerDev = styled.div`
display: flex;
position: fixed;
right: 0;
top:0;
z-index: 100
`

export default App
