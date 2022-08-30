import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { LinearProgress } from '@mui/material'
import { useParams } from 'react-router-dom'


import { CoinInfo, SideBarCoin } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchSingleCoin, unFetchCoin } from '../../store/singleCoin/SingleCoin'

// import styles from './coinPage.scss' 
const sx ={
  linearProgress: { backgroundColor: "gold", width: '100%' }
}

const CoinPage = () => {
  const {id} = useParams()

  const dispatch = useAppDispatch()
  const {coin, error, loading} = useAppSelector(state => state.singleCoin)
  
  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(fetchSingleCoin(id))
    }
    return () => {
      dispatch(unFetchCoin())
    }
  }, [id, dispatch])

  const Container = styled('div')(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  return (
    <Container>
      {loading &&  <LinearProgress sx={sx.linearProgress} />}
      {coin && (
        <>
          <SideBarCoin coin={coin}/>
          <CoinInfo coin={coin}/> 
        </>
      )}
      {error && <h2>{error}</h2>}
    </Container>
  )
}

export default CoinPage