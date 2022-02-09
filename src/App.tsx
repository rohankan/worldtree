import React, {FC} from 'react'
import Calendar from "./components/Calendar"
import Terminal from "./components/Terminal"
import Name from "./components/Name"
import styled from "styled-components"

const Container = styled.div`
  width: min(100%, 500px);
  height: 100vh;
  position: relative;
  font-family: monospace;
`

const App: FC = () => {
  // commitDbObject({})
  return (
    <Container>
      <Name />
      <Calendar />
      <Terminal />
    </Container>
  )
}

export default App
