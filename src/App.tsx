import React from 'react'
import { Routes, Route } from 'react-router-dom'

import {  CoinPage, Home } from './pages'
import { Header } from './components'

import './css/app.css'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={< Home />}/>
        <Route path='/coins/0' element={< CoinPage />}/>
      </Routes>
    </div>
  )
}

export default App