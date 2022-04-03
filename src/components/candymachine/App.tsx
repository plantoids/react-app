import './App.css'
import Home from './Home'
import { useMemo } from 'react'
import * as anchor from '@project-serum/anchor'

import { clusterApiUrl } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets'

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!
    )

    return candyMachineId
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e)
    return undefined
  }
}

const candyMachineId = getCandyMachineId()
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet')
)

const txTimeoutInMilliseconds = 30000

const App = (props: any) => {
  const endpoint = useMemo(() => clusterApiUrl(network), [])

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <Home
            candyMachineId={candyMachineId}
            connection={connection}
            txTimeout={txTimeoutInMilliseconds}
            rpcHost={rpcHost}
          />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
