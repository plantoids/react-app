import React from 'react'
import {
//   WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'



const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__inner">
          <div className="header__logo">
            <img src="./assets/plantoids-logo.svg" alt="plantoids logo" />
          </div>
          <div className='header__links'>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.plantoids.io/"
            >
              Whitepaper
            </a>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
