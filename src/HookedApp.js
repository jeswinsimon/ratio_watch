import React from "react"
import styled from "styled-components"
import RatePanel from "./components/RatePanel.js"
import AddForm from "./components/AddForm"
import { ShapeShift, CryptoCompare } from "./utils"
import { useLocalStorage } from "./components/useLocalStorage"

import { pairs as sampleData } from "./data"

export function HookedApp() {
  const [viewMode, setViewMode] = useLocalStorage("viewMode", true)
  const [pairs, setPairs] = useLocalStorage("pairs", sampleData)

  const addPair = (from, to) => {
    console.log("yo")
    setPairs([...pairs, { from: from, to: to, api: "cc" }])
    setViewMode(!viewMode)
  }

  let APIs = { ss: ShapeShift, cc: CryptoCompare }
  let showControls = true

  return (
    <Wrapper>
      <Container>
        {viewMode ? (
          pairs.map((pair, i) => (
            <RatePanel key={i} {...pair} API={APIs[pair.api]} />
          ))
        ) : (
          <AddForm handleSubmit={addPair} />
        )}
        <Footer>
          {showControls && (
            <Link onClick={() => setViewMode(!viewMode)}>
              {viewMode ? "Add" : "Cancel"}
            </Link>
          )}
        </Footer>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({
  className: "flex justify-center",
})``

const Container = styled.div.attrs({
  className: "w-100 flex flex-column mt4-ns",
})`
  max-width: 960px;
`

const Link = styled.a.attrs({
  className: "link b pointer",
})``

const Footer = styled.div.attrs({
  className: "f6 code pa3 ph0-ns flex justify-between",
})``