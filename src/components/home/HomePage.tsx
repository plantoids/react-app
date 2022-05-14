import React, { useState, useEffect, useMemo } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletNfts, NftTokenAccount } from '@nfteyez/sol-rayz-react'

import * as anchor from '@project-serum/anchor'

import 'src/components/home/HomePage.css'
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
      <header className="navbar">
        <span className="logo">
          <img src="./assets/plantoids-logo.svg" alt="plantoids logo" />
        </span>
        <span className="connect">
          <WalletMultiButton />
        </span>
      </header>
      <div className="title">
        <h1>Your Plantoids</h1>
        <p>See and manage all your Plantoids</p>
      </div>
      {isLoading && <div>Loading...</div>}
      {nfts && (
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
      )}
    </div>
  )
}

export default HomePage
