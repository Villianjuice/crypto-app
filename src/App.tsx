import { Routes, Route } from 'react-router-dom'
import {  createTheme, ThemeProvider } from '@mui/material'

import {  CoinPage, Home } from './pages'
import { Header } from './components'
import { AlertMessage } from './composables'
import { useAppDispatch } from './store/hooks'

import './scss/index.scss'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'
import { login, logout } from './store/userSlice/UserSlice'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Montserrat",
    }
  }
});


const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        )
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch])
  
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