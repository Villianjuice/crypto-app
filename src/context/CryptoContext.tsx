import { AlertColor } from '@mui/material';
import { createContext, useState, useEffect, useContext } from 'react'

export interface CryptoContextInterface {
  currency: string;
  symbol: Symbol;
  days: number;
  setCurrency: React.Dispatch<React.SetStateAction<string>> ;
  setDays: React.Dispatch<React.SetStateAction<number>> ;
  alert: {
    open: boolean;
    message: string ;
    type: AlertColor;
  };
  setAlert: React.Dispatch<React.SetStateAction<{
    open: boolean;
    message: string;
    type: AlertColor;
  }>>
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
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    type: AlertColor;
}>({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (currency === 'RUB') setSymbol(Symbol.RUB)
    else if (currency === 'USD') setSymbol(Symbol.USD)
  }, [currency])
  

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency, days, setDays, alert, setAlert}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const useCryptoContext = () => useContext(Crypto) as CryptoContextInterface