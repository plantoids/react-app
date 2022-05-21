import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'src/components/App.css'
import HomePage from 'src/components/home/HomePage'
import MintPage from 'src/components/mint/MintPage'
import PublicViewPage from 'src/components/publicview/PublicViewPage'
import WalletProvider from 'src/provider/WalletProvider'

// eslint-disable-next-line
declare const global: { HermesInternal: null | {} }

const IndexPage = (
  <div className="index-page-container">
    <h1>Welcome to Plantoids Index!</h1>
    <p>Feel free to peruse the following pages:</p>
    <ul>
      <li>
        <a href="/me">/me</a> Home
      </li>
      <li>
        <a href="/mint">/mint</a> Mint
      </li>
    </ul>
  </div>
)

const App = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={IndexPage} />
            <Route path="/me" element={<HomePage />} />
            <Route path="/mint" element={<MintPage />} />
            <Route path="/plantoids/:mint" element={<PublicViewPage />} />
          </Routes>
        </Router>
      </WalletProvider>
    </div>
  )
}

export default App
