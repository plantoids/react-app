import React, { useState, useEffect, useMemo } from 'react'
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletNfts } from '@nfteyez/sol-rayz-react'

import * as anchor from '@project-serum/anchor'

import 'src/components/home/HomePage.css'
import 'src/components/home/WalletAdapterButton.css'
import PlantCard from 'src/components/home/plant/PlantCard'

function verifyUpdateAuthority(test: string) {
  console.log(
    'verifyUpdateAuthority',
    test,
    process.env.REACT_APP_CANDY_MACHINE_UPLOAD_AUTHORITY
  )
  return test === process.env.REACT_APP_CANDY_MACHINE_UPLOAD_AUTHORITY
}

const HomePage = () => {
  const { publicKey } = useWallet()
  const [tokens, setTokens] = useState([] as any[])
  const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!
  const connection = new anchor.web3.Connection(
    rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet')
  )

  const { nfts, isLoading } = useWalletNfts({
    publicAddress: publicKey?.toString() || '',
    connection,
  })

  const filteredTokens = useMemo(
    () => nfts.filter((nft: any) => verifyUpdateAuthority(nft.updateAuthority)),
    [nfts]
  )

  return (
    <div className="home-page-container">
      <header>
        <span className="logo">
          <img src="./assets/plantoids-logo.svg" alt="plantoids logo" />
        </span>
        <span className="connect">
          {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
        </span>
      </header>
      <p>I am the home page :D:D:D:D</p>
      <hr />
      {isLoading && <div>Loading...</div>}
      {nfts && (
        <div>
          <h4>Wallet have {tokens?.length} tokens</h4>
          <ul>
            {filteredTokens.map((token: any, i: number) => {
              console.log(token.mint, i)
              return token ? (
                <PlantCard key={token.mint} token={token} />
              ) : (
                <li key={i}>Loading...</li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default HomePage
