import { Routes, Route } from 'react-router-dom'
import {  createTheme, ThemeProvider } from '@mui/material'

import {  CoinPage, Home } from './pages'
import { Header } from './components'
import { AlertMessage } from './composables'

import './scss/index.scss'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Montserrat",
    }
  }
});


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={< Home />}/>
          <Route path='/coin/:id' element={< CoinPage />}/>
        </Routes>
      </div>
      <AlertMessage />
    </ThemeProvider>
    
  )
}

export default App