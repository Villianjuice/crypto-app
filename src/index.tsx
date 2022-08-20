import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import App from './App'
import CryptoContext from './context/CryptoContext';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <CryptoContext>
      <Provider store={store}>
        <App />
      </Provider>
    </CryptoContext>
  </BrowserRouter>
)


