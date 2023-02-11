import React from 'react'
import ReactDOM from 'react-dom/client'

import 'antd/dist/reset.css';
import '@renderer/global.scss';

import App from '@renderer/pages/app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
