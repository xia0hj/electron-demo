import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css';
import './global.scss'
import App from './pages/app'
import { store } from '@/store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>

    </Provider>
  </React.StrictMode>,
)
