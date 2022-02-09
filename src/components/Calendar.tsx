import React, {FC, useEffect, useState} from 'react'
import styled from "styled-components"
import githubdb from "../database/githubdb"

const CALENDAR_COLLECTION = 'calendar'

const ItemContainer = styled.div<{
  durationMinutes: number
}>`
  width: 100%;
  height: ${({durationMinutes}) => durationMinutes}px;
`

const ItemTitle = styled.p`
  font-size: 0.5em
`

const Item: FC<{
  startMinutes: number
  endMinutes: number
  name: string
}> = ({name, startMinutes, endMinutes}) => (
  <ItemContainer durationMinutes={endMinutes - startMinutes}>
    <ItemTitle>
      {name}
    </ItemTitle>
  </ItemContainer>
)

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(219,157,2,1) 0%, rgba(0,38,177,1) 100%);
`

const Calendar: FC = () => {
  const [items, setItems] = useState<null | any[]>(null)

  useEffect(() => {
    const data = githubdb.collections.read(CALENDAR_COLLECTION)
    setItems((data as any).items)
  }, [])

  return (
    <Container>
      {items && items.map(({name, ...data}) =>
        <Item key={name} name={name} {...data} />
      )}
    </Container>
  )
}

export default Calendar
