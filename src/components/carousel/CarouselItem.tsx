import { Link } from 'react-router-dom'

import { useCryptoContext } from '../../context/CryptoContext'
import { CoinType } from '../../types/types'
import { RoundNumber } from '../../utils/CoinsTable'

import styles from './carousel.module.scss'

interface CarouselItemProps {
  item: CoinType
}

export const CarouselItem: React.FC <CarouselItemProps> = ({item}) => {
  const {symbol} = useCryptoContext()
  
  let profit = item.price_change_percentage_24h >=0
  return (
    <Link to={`/coins/${item.id}`} className={styles.carouselItem}>
      <img 
        src={item.image} 
        alt={item.name}  
        className={styles.carouselItem__img} 
      />
      <span>
        {item.symbol}
        &nbsp;
        <span style={{
              color: profit  ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>
          {profit && '+'} 
           {item.price_change_percentage_24h.toFixed(2)}%
        </span>
      </span>
      <span style={{fontSize: 22, fontWeight: 500}}>
        {symbol} {RoundNumber(item.current_price.toFixed(2))}
      </span>
    </Link>
  )
}
