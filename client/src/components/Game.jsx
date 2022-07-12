import styled from '@emotion/styled'
import { useState } from 'react'


const Section = styled.section`
    width: 96vw;
    margin: 0 auto;
    // border: 1px solid #fff;
    margin-top: 2rem;
    min-height: calc(100vh - 9rem);
    font-size: 1.2rem;
`

const Location = styled.h3`
    margin-top: 0;
    font-weight: 600;
    color: #000;
    background-color: #fff;
    padding-left: 8px;
`

const Body = styled.p`
    margin: 0;
    padding-left: 8px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
        margin-top: 1rem;
`

const Input = styled.input`
    border: none;
    width: 50vw;
    background: #000;
    color: #fff;
    padding-left: 4px;

    font-size: 1.2rem;

    &:focus {
        outline: none;
    }
`
const Game = () => {
    const [command, setCommand] = useState('')
    const [displayText, setDisplayText] = useState([
        'You are standing in front of an open field west of a white house, with a boarded front door.',
        'There is a small mailbox here.',

    ])
    const [location, setLocation] = useState('West of House')

    const [linkedLocations, setLinkedLocations] = useState({
        'NORTH': {
            location: 'North of House',
            displayText: [
                'You are facing the north of the white house.',
                'There is no door here and all windows are boarded up.',
                'To the north a narrow path winds through the trees.'
            ]
        },
        'SOUTH': {
            location: 'South of House',
            displayText: [
                'You are facing the south side of the white house. There is no door here and all windows are boarded.'
            ]
        },
        'WEST': {
            location: 'Forest',
            displayText: [
                'This is a forest, with trees in all directions. To the east, there appears to be sunlight.'
            ]
        }
    })

    const executeCommand = async (e) => {
        if (e.code != 'Enter') return;
        if (command.startsWith('GO')) {
            try {
                const direction = command.split(' ')[1]
                setLocation(linkedLocations[direction].location)
                setDisplayText(linkedLocations[direction].displayText)
            } catch (e) {
                setDisplayText(['Command not recognised.'])
            }
        }
        // const res = await fetch()
        setCommand('')
    }

    return <Section>
        <Location>{location}</Location>
        {displayText.map((el, idx) => <Body
            key={idx}
        >
            {el}
        </Body>
        )}
        <InputContainer>
            <span>{'>'}</span>
            <Input
                type="text"
                value={command}
                onChange={e => setCommand(e.target.value.toUpperCase())}
                autoFocus={true}
                onKeyUp={executeCommand}
                placeholder={'Type your command'}
            />
        </InputContainer>
    </Section>
}


export default Game;
