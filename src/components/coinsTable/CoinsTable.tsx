import React, { useState } from 'react'
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { createSelector } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

import { useCryptoContext } from '../../context/CryptoContext'
import { RootState } from '../../store'
import { useAppSelector } from '../../store/hooks'
import { RoundNumber } from '../../utils/RoundNumber'

import styles from './coinsTable.module.scss'

interface CoinsTableProps {
  search: string
}

const sx = {
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    }
  },
  linear: {
    backgroundColor: "gold"
  },
  tableHead: {
    backgroundColor: "#EEBC1D"
  },
  tableCellCoin: {
    display: 'flex', 
    gap: '15px'
  },
  tableCellNames: {
    color: "black",
    fontWeight: "700",
  },
  pagination: {
    padding: '25px',
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}

export const CoinsTable: React.FC <CoinsTableProps> = ({search}) => {
  const [page, setPage] = useState(1)

  const handleSearch = createSelector(
    (state: RootState) => state.coins,
    (coins) => coins.coins
    .slice((page - 1) * 10, (page - 1) * 10 + 10)
    .filter(coin => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
  )

  const loading = useAppSelector(state => state.coins.loading)
  const error = useAppSelector(state => state.coins.error)
  const coins = useAppSelector(handleSearch)
  const {symbol} = useCryptoContext()

  const nav = useNavigate()

  return (
    <>
      <TableContainer>
        {loading && <LinearProgress sx={sx.linear} />}
        {coins.length > 0 && 
          <Table>
          <TableHead sx={sx.tableHead}>
            <TableRow>
              {["Coin", "Price", "24h Change", "Market Cap"].map(head => 
                <TableCell 
                  sx={sx.tableCellNames}
                  key={head}
                  align={head === "Coin" ? "inherit" : "right"}
                >
                  {head}
                </TableCell>  
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map(coin => {
              const profit = coin.price_change_percentage_24h > 0;
              
              return (
                <TableRow 
                  sx={sx.row}
                  key={coin.id}
                  onClick={() => nav(`/coin/${coin.id}`)} 
                >
                  <TableCell 
                    component='th' 
                    scope='row' 
                    sx={sx.tableCellCoin}
                  >
                    <img src={coin.image} alt={coin.name} className={styles.coins__img} />
                    <div className={styles.coins__about}>
                      <span className={styles.coins__symbol}>{coin.symbol}</span>
                      <span className={styles.coins__title}>{coin.name}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell align="right">
                    {symbol}{" "}
                    {RoundNumber(coin.current_price.toFixed(2))}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      color: profit ? "rgb(14, 203, 129)" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {profit && "+"}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  
                  <TableCell align="right">
                    {symbol}{" "}
                    {RoundNumber(
                      coin.market_cap.toString().slice(0, -6)
                    )}
                    M
                  </TableCell>
                </TableRow>
              )
              }
            )}
          </TableBody>
          </Table>
        }
        {error && <h2>{error}</h2>}
        
      </TableContainer>
      <Pagination  
        count={coins.length}
        sx={sx.pagination}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </>
  )
}
