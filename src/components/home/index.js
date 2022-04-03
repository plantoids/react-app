import React from 'react'
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'

import CandyMachine from 'src/components/candymachine/App'

export const HomePage = () => {
  return (
    <div>
      <p>I am the home page :D:D:D:D</p>

      <WalletMultiButton />
      <WalletDisconnectButton />
      <hr />
      <CandyMachine />
    </div>
  )
}
