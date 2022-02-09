import React from 'react'
import styled from "styled-components"

const NameText = styled.p`
 position: absolute;
 top: 0;
 right: 0;
 color: white;
 font-size: 1em;
 padding: 10px;
 margin: 0;
`

const Name: React.FC = () => (
  <NameText>RPK</NameText>
)

export default Name
