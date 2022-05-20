import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import '../styles/app.scss'
import { HomePage } from 'src/components/home'
// import MintPage from 'src/components/mint/MintPage'
import WalletProvider from 'src/components/wallet/Provider'


// eslint-disable-next-line
declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <div >
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/mint" element={<MintPage />} /> */}
          </Routes>
        </Router>
      </WalletProvider>
    </div>
  )
}

export default App
