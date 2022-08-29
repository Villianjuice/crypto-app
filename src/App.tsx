import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import {  createTheme, ThemeProvider } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'

import {  CoinPage, Home } from './pages'
import { Header } from './components'
import { AlertMessage } from './composables'
import { useAppDispatch, useAppSelector } from './store/hooks'

import { auth, db } from './firebase/firebase'
import { login, logout } from './store/userSlice/UserSlice'
import './scss/index.scss'
import { doc, onSnapshot } from 'firebase/firestore'
import { setWatchList } from './store/watchList/watchList'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Montserrat",
    }
  }
});


const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user)

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

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          dispatch(setWatchList(coin.data().coins));
        } else {
          console.log("No Items in Watchlist");
        }
      });
      return () => {
        unsubscribe()
      }
   }
  }, [user, dispatch])
  
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