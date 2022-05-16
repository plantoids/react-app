import React, { useState, useEffect, useMemo } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletNfts, NftTokenAccount } from '@nfteyez/sol-rayz-react'

import * as anchor from '@project-serum/anchor'

import 'src/components/home/HomePage.css'
import PlantCard from 'src/components/home/PlantCard'
import PlantDetails from 'src/components/home/PlantDetails'

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
  const [detailsToken, setDetailsToken] = useState<NftTokenAccount>()
  const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!
  const connection = new anchor.web3.Connection(
    rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet')
  )

  const publicAddress = publicKey?.toString() || ''
  const { nfts, isLoading } = useWalletNfts({
    publicAddress,
    connection,
  })

  const filteredTokens = useMemo(
    () => nfts.filter((nft: any) => verifyUpdateAuthority(nft.updateAuthority)),
    [nfts]
  )

  const setDetailsView = (token: NftTokenAccount) => () =>
    setDetailsToken(token)

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
      <ul className="list">
        {isLoading && <div>Loading...</div>}
        {filteredTokens &&
          filteredTokens.map((token: any, i: number) => {
            console.log('HomePage', 'filteredTokens.map', token)
            return (
              <PlantCard
                key={token.mint}
                token={token}
                onInspect={setDetailsView(token)}
              />
            )
          })}
      </ul>
      {detailsToken && (
        <div className="details">
          <PlantDetails
            key={detailsToken.mint}
            token={detailsToken}
            owner={publicAddress}
          />
        </div>
      )}
    </div>
  )
}

export default HomePage
