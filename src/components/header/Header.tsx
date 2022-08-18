import React from 'react'
import { useNavigate } from 'react-router-dom';
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider} from '@mui/material';

import styles from './header.module.scss'
import { Crypto, CryptoContextInterface, useCryptoContext } from '../../context/CryptoContext';

export const Header = () => {
  const nav = useNavigate()
 
  const {currency, setCurrency} = useCryptoContext() 

  console.log(currency)

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
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
