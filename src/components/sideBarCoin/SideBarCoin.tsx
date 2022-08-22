import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import parse from 'html-react-parser';

import { ISingleCoin } from '../../types/types';
import { RoundNumber } from '../../utils/CoinsTable';
import { useCryptoContext } from '../../context/CryptoContext';

interface SideBarCoinProps {
  coin: ISingleCoin
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
  flex: {display: 'flex'}
}

export const SideBarCoin: React.FC <SideBarCoinProps> = ({coin}) => {
  const {currency, symbol} = useCryptoContext()

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
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));
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
        
      </MarketData>
      
    </Sidebar>
  )
}
