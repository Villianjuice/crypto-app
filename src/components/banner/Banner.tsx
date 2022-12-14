import { Container, Typography } from '@mui/material'
import React from 'react'

import styles from './banner.module.scss'
import { Carousel } from '../index'

const sx = {
  content: {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '25px',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  subtitle: {
    color: "darkgrey",
    textTransform: "capitalize",
  }
}

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Container sx={sx.content}>
        <div className={styles.tagline}>
          <Typography variant='h2' sx={sx.title} >
            Crypto Tracker
          </Typography> 
          <Typography variant='subtitle2' sx={sx.subtitle} >
            Get all the Info regarding your favorite Crypto Currency
          </Typography> 
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner
