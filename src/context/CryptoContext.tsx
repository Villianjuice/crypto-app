import { createContext, useState, useEffect } from 'react'

export interface CryptoContextInterface {
  currency: string;
  symbol: Symbol;
  setCurrency: React.Dispatch<React.SetStateAction<string>> ;
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

  useEffect(() => {
    if (currency === 'RUB') setSymbol(Symbol.RUB)
    else if (currency === 'USD') setSymbol(Symbol.USD)
  }, [currency])
  

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

// export const CryptoState = () => {
//   return useContext(Crypto)
// }