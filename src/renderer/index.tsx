import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';

import 'antd/dist/reset.css';
import '@renderer/global.scss';

import RootContainer from '@renderer/pages/root-container'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <RootContainer />
    </HashRouter>
  </React.StrictMode>,
)
