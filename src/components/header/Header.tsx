import React from 'react'
import { useNavigate } from 'react-router-dom';
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider} from '@mui/material';

import styles from './header.module.scss'
import { useCryptoContext } from '../../context/CryptoContext';
import { AuthModal } from '../index';
import { useAppSelector } from '../../store/hooks';

export const Header = () => {
  const nav = useNavigate()
 
  const {currency, setCurrency} = useCryptoContext() 

  const user = useAppSelector(state => state.user.user);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      mode: 'dark'
    }
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container >
          <Toolbar>
            <Typography 
              onClick={() => nav('/')}
              className={styles.title}
              variant='h5'
            >
              Crypto Tracker
            </Typography>

            <Select 
              variant='outlined' 
              style={{
                width: 100,
                height: 40,
                marginRight: 15
              }}
              value={currency}
              onChange={e => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'RUB'}>RUB</MenuItem>
            </Select>
            {user ? 'Logout' : <AuthModal />}
            
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
