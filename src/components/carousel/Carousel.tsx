import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { TrendingCoins } from '../../config/api'
import { useCryptoContext } from '../../context/CryptoContext'

import styles from './carousel.module.scss'
import { TrendingCoinsType } from '../../types/types'
import { CarouselItem } from './CarouselItem';

export const Carousel = () => {
  const [tranding, setTranding] = useState<TrendingCoinsType[]>([])
  const {currency} = useCryptoContext()

  const fetchTrendingCoins = useCallback(async () => {
    const {data} = await axios.get<TrendingCoinsType[]>(TrendingCoins(currency))
    setTranding(data)
  }, [currency])

  useEffect(() => {
    fetchTrendingCoins()
  }, [fetchTrendingCoins])

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  
  return (
    <div className={styles.carousel}>
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive} 
        autoPlay
        items={
          tranding.map(item => 
            <CarouselItem item={item}/>  
          )
        }
        
      />
    </div>
  )
}
