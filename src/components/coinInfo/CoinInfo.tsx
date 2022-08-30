import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';

import { useCryptoContext } from '../../context/CryptoContext';
import { ISingleCoin } from '../../types/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchChart, unFetchChart } from '../../store/historicalChart/HistoricalChart';
import { CoinChart } from '../coinChart/CoinChart';

interface CoinInfoProps {
  coin: ISingleCoin
}

const Container = styled('div')(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

export const CoinInfo: React.FC <CoinInfoProps> = ({coin}) => {
  
  const {chart, error, loading} = useAppSelector(state => state.chart)
  const {currency, days} = useCryptoContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChart({currency, days, id: coin.id}))

    return () => {
      dispatch(unFetchChart())
    }
  }, [dispatch, currency, days, coin])

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
      <Container>
        {loading && 
          <CircularProgress 
            sx={{ color: "gold" }}
            size={200}
            thickness={1}
          />
        }
        {chart && 
          <CoinChart chart={chart}/>
        }
        {error &&
          <h2>{error}</h2>
        }
      </Container>
    </ThemeProvider>
  )
}
