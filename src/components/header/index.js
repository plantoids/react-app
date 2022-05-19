import React, { useEffect } from 'react'
import {
  //   WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'

import gsap from 'gsap'

const Header = () => {
  useEffect(() => {
    gsap.to('.header', {
      translateY: 0,
      opacity: 1,
      duration: 2,
      delay: 0,
      ease: 'Power2.easeOut',
    })

    return () => {}
  }, [])

  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__inner">
          <div className="header__logo">
            <img src="./assets/plantoids-logo.svg" alt="plantoids logo" />
          </div>
          <div className="header__links">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.plantoids.io/"
            >
              <svg
                width="12"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity=".6"
                  d="M11.931.62c-.11-.25-.3-.44-.54-.54a.867.867 0 0 0-.38-.08h-10c-.56 0-1 .44-1 1 0 .55.44 1 1 1h7.59l-8.3 8.29c-.4.38-.4 1.02-.01 1.41h-.01c.38.39 1.02.39 1.41 0v-.01l8.29-8.3v7.59c0 .55.44 1 1 1 .55 0 1-.45 1-1v-10a1.17 1.17 0 0 0-.08-.38l.03.02Z"
                  fill="#1B1C1D"
                />
              </svg>
              <p>Whitepaper</p>
            </a>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
