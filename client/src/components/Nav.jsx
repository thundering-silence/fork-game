import styled from "@emotion/styled";
import SequenceConnect from "./Sequence";


const NavBar = styled.nav`
    height: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 96vw;
    margin: 0 auto;
`

const Title = styled.h1`
    font-size: 2rem;
`

const Nav = ({ wallet }) => {
    return <NavBar >
        <Title>FORK: A Web3 Adventure</Title>
        <SequenceConnect wallet={wallet} />
    </NavBar>
}

export default Nav
