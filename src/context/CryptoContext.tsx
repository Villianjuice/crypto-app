import { createContext, useState, useEffect, useContext } from 'react'

export interface CryptoContextInterface {
  currency: string;
  symbol: Symbol;
  days: number;
  setCurrency: React.Dispatch<React.SetStateAction<string>> ;
  setDays: React.Dispatch<React.SetStateAction<number>> ;
}

enum Symbol {
  USD = '$',
  RUB = '₽'
}

type CryptoContextProps = {
  children: JSX.Element
};

export const Crypto = createContext<CryptoContextInterface | null>(null)

const CryptoContext: React.FC <CryptoContextProps> = ({children}) => {
  const [currency, setCurrency] = useState('USD')
  const [symbol, setSymbol] = useState(Symbol.USD)
  const [days, setDays] = useState(1);

  useEffect(() => {
    if (currency === 'RUB') setSymbol(Symbol.RUB)
    else if (currency === 'USD') setSymbol(Symbol.USD)
  }, [currency])
  

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency, days, setDays}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const useCryptoContext = () => useContext(Crypto) as CryptoContextInterface