export type CoinType = {
  id: string;
  image: string;
  name: string
  symbol: string;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number
}

export type ISingleCoin = {
  id: string;
  image: {
    thumb: string;
    small: string;
    large: string;  
  }
  name: string;
  description: {
    en: string
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      rub: number;
      usd: number;
    };
    market_cap: {
      rub: number;
      usd: number;
    }
  }
}

export type IChart = {
  prices: Array<number[]>
}