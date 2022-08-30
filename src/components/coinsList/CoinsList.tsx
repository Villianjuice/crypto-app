import { useEffect, useState } from 'react'
import { Container, createTheme, TextField, ThemeProvider, Typography } from '@mui/material'

import { useCryptoContext } from '../../context/CryptoContext'
import { useAppDispatch } from '../../store/hooks'
import { fetchCoins } from '../../store/coinsSlice/CoinsSlice'
import { CoinsTable } from '../index'

const CoinsList = () => {
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

  // if (Math.random() > 0.5) {
  //   return new Error('error')
  // }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{textAlign: 'center'}}>
        <Typography
          variant="h4"
          style={{ margin: 18}}
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

export default CoinsList
