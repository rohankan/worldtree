import React, {Dispatch, FC, Fragment, useEffect, useState} from 'react'
import styled from "styled-components"

type Time = {
  hours: number
  minutes: number
}

const Parameters = {
  TIME: {
    parser: (value: string): Time => ({
      hours: parseInt(
        value.length === 4 ? value.substring(0, 1) : value.substring(0, 2),
        10,
      ),
      minutes: parseInt(
        value.substring(value.length - 3, value.length - 1),
        10,
      ),
    }),
  },
  NUMBER: {
    parser: (value: string) => parseInt(value, 10),
  },
  NAME: {
    parser: (value: string) => value,
  },
  LOCATION: {
    parser: (value: string) => value,
  },
}

type ParameterTemplate<T> = {
  parser: (value: string) => T
}

const param = (
  parameter: ParameterTemplate<any>,
  name: string,
): Parameter<any> => ({...parameter, name})

type Parameter<T> = ParameterTemplate<T> & {
  name: string
}

type Command = {
  description: string
  parameters: Parameter<any>[]
}

const COMMANDS: {[key: string]: Command} = {
  help: {
    description: 'display available commands',
    parameters: [],
  },
  af: {
    description: 'add fixed calendar constraint',
    parameters: [
      param(Parameters.TIME, 'start time'),
      param(Parameters.TIME, 'end time'),
      param(Parameters.NAME, 'event name'),
    ],
  },
  at: {
    description: 'add task',
    parameters: [
      param(Parameters.NAME, 'task name'),
      param(Parameters.NUMBER, 'duration in minutes'),
    ]
  },
  cp: {
    description: 'change minimum padding between events',
    parameters: [param(Parameters.NUMBER, 'padding in minutes')],
  },
  cf: {
    description: 'change free time per day',
    parameters: [param(Parameters.NUMBER, 'padding in minutes')],
  }
}

const Input = styled.input`
  margin: 5px; 
  border-radius: 15px;
  border: 1px solid black;
  caret-color: mediumspringgreen;
  font-family: monospace;
  background-color: black;
  color: mediumspringgreen;
  outline: none;
  font-size: 1em;
  width: 100%;
`

const DollarSign = styled.span`
  margin-left: 10px;
  color: mediumspringgreen;
`

const processInput = (input: string) => {
  const keys = Object.keys(COMMANDS)

}

const InputContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InputContainer: FC<{
  setActiveCommand: any
}> = ({setActiveCommand}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    document.onkeydown = e => {
      if (e.key === 'e') {
        inputRef.current?.focus()
      }
    }

    return () => {document.onkeydown = null}
  }, [])

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setActiveCommand(value)
    }
  }

  return (
    <InputContainerStyled>
      <DollarSign>$</DollarSign>
      <Input
        ref={inputRef}
        value={value}
        onKeyPress={onKeyPress}
        onChange={e => setValue(e.target.value)}
      />
    </InputContainerStyled>
  )
}

const SpaceBetweenRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const Suggestion: FC = () => (
  <SpaceBetweenRow>

  </SpaceBetweenRow>
)


const SuggestionWindowStyled = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
`

const SuggestionWindow: FC = () => {
  return (
    <SuggestionWindowStyled>

    </SuggestionWindowStyled>
  )
}

const DialogItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const DialogContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`

const DialogText = styled.p`
  font-size: 1em;
  color: mediumspringgreen;
`

const DialogItem: FC<{
  name: string
  value: string
}> = ({name, value}) => (
  <DialogItemContainer>
    <DialogText>{name}</DialogText>
    <DialogText>{value}</DialogText>
  </DialogItemContainer>
)

const InputDialog: FC<{
  activeCommand: string | null
  values: {[key: string]: string}
}> = ({activeCommand, values}) => {
  if (!activeCommand) {
    return <Fragment />
  }

  const {description, parameters} = COMMANDS[activeCommand]
  console.log(description, parameters)

  return (
    <DialogContainer>
      {parameters.map(({name}) =>
        <DialogItem name={name} value={values[name]} key={name} />
      )}
    </DialogContainer>
  )
}

const TerminalContainer = styled.div`
  position: absolute;
  bottom: 5px;
  left: 0;
  border-radius: 30px;
  box-shadow: -1px 3px 7px black;
  width: calc(100% - 40px);
  margin: 10px;
  display: flex;
  background-color: black;
  justify-content: center;
  padding: 10px;
  align-items: center;
  font-size: 1.8em;
`

const Terminal: FC = () => {
  const [activeCommand, setActiveCommand] = useState(null)
  const [values, setValues] = useState({})

  return (
    <Fragment>
      <InputDialog activeCommand={activeCommand} values={values} />
      <TerminalContainer>
        <SuggestionWindow />
        <InputContainer setActiveCommand={setActiveCommand} />
      </TerminalContainer>
    </Fragment>
  )
}

export default Terminal
