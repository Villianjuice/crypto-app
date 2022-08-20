import { useEffect, useState } from 'react'
import { Container, createTheme, TextField, ThemeProvider, Typography } from '@mui/material'

import { useCryptoContext } from '../../context/CryptoContext'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchCoins } from '../../store/coinsSlice/CoinsSlice'
import { CoinsTable } from '../index'

export const CoinsList = () => {
  const { currency } = useCryptoContext()
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCoins(currency))
  }, [dispatch, currency])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{textAlign: 'center'}}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          sx={{ marginBottom: '20px', width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CoinsTable search={search}/>
      </Container>
    </ThemeProvider>
  )
}
