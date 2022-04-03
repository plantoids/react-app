import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from 'src/components/home'
import WalletProvider from 'src/components/wallet/Provider'

declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </WalletProvider>
    </div>
  )
}

export default App
