import { useState } from 'react'
import './App.css'

import { ethers } from 'ethers'
import { sequence } from '0xsequence'
import SequenceConnect from './components/Sequence'
import Main from './components/Main'
import Game from './components/Game'
import Nav from './components/Nav'



function App() {
  const wallet = new sequence.Wallet('polygon')

  return (
    <Main>
      <Nav wallet={wallet} >
      </Nav>
      <Game />
    </Main>
  )
}

export default App
