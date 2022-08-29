import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import parse from 'html-react-parser';

import { ISingleCoin } from '../../types/types';
import { RoundNumber } from '../../utils/RoundNumber';
import { useCryptoContext } from '../../context/CryptoContext';
import { useAppSelector } from '../../store/hooks';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface SideBarCoinProps {
  coin: ISingleCoin
}

const Sidebar = styled('aside')(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: '25px',
  borderRight: "2px solid grey",
}));

const MarketData = styled('div')(({ theme }) => ({
  alignSelf: "start",
  padding: '25px',
  paddingTop: '10px',
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

export const SideBarCoin: React.FC <SideBarCoinProps> = ({coin}) => {
  const {currency, symbol, setAlert} = useCryptoContext()

  const user = useAppSelector(state => state.user.user)
  const watchList = useAppSelector(state => state.watchList.watchList)

  const inWatchList = watchList.includes(coin.id)

  const addToWatchlist = async() => {
    if (user) {
      try {
        const coinRef = doc(db, "watchlist", user.uid)
        await setDoc(coinRef, 
          { coins: watchList ? [...watchList, coin.id] : [coin.id] },
          { merge: true }
        )
        setAlert({
          open: true,
          message: `${coin.name} Added to the Watchlist !`,
          type: "success",
        });
      }
      catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        setAlert({
          open: true,
          message: message,
          type: 'error'
        })
      }
    }
  }

  const removeFromWatchlist = async() => {
    if (user) {
      try {
        const coinRef = doc(db, "watchlist", user.uid)
        await setDoc(coinRef, 
          { coins: watchList.filter((wish) => wish !== coin?.id)},
          { merge: true }
        )
        setAlert({
          open: true,
          message: `${coin.name} Removed from the Watchlist !`,
          type: "success",
        });
      }
      catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        setAlert({
          open: true,
          message: message,
          type: 'error'
        })
      }
    }
  }

  const sx ={
    heading: {
      fontWeight: "bold",
      marginBottom: '20px',
    },
    description: {
      width: "100%",
      padding: '25px',
      paddingBottom: '15px',
      paddingTop: 0,
      textAlign: "justify",
    },
    flex: {display: 'flex'},
    button: {
      width: "100%",
      height: 40,
      color: '#fff',
      backgroundColor: inWatchList ? "#ff0000" : "#EEBC1D",
    }
  }
  
  return (
    <Sidebar >
      <img src={coin.image.large} alt={coin.name} height='180' style={{marginBottom: 20}}/>
      <Typography variant="h3" sx={sx.heading}>
        {coin.name}
      </Typography>
      <Typography variant="subtitle1" sx={sx.description}>
        {parse(coin.description.en.split(". ")[0])}.
      </Typography>
      <MarketData>
        <Box sx={sx.flex}>
          <Typography variant='h6' sx={sx.heading}>Rank: </Typography>
          &nbsp; &nbsp;
          <Typography variant='h6'>{coin.market_cap_rank}</Typography>
        </Box>
        <Box sx={sx.flex}>
          <Typography variant='h6' sx={sx.heading}>Current Price:</Typography>
          &nbsp; &nbsp;
          <Typography variant='h6'> 
          {symbol} {'  '}
          {RoundNumber(currency === 'USD' ? coin.market_data.current_price.usd : coin.market_data.current_price.rub)}
          </Typography>
        </Box>
        <Box sx={sx.flex}>
          <Typography variant='h6' sx={sx.heading}>Market Cap: </Typography>
          &nbsp; &nbsp;
          <Typography variant='h6'>
            {symbol} {'  '}
            {RoundNumber(currency === 'USD' ? coin.market_data.market_cap.usd : coin.market_data.market_cap.rub)
              .toString()
              .slice(0, -6)}M
          </Typography>
        </Box>
        {user && 
         <Button
            variant="outlined"
            sx={sx.button}
            onClick={inWatchList ? removeFromWatchlist : addToWatchlist}
          >
            {inWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
        }
        
      </MarketData>
      
    </Sidebar>
  )
}
