import React, { useState, useEffect, useMemo } from 'react'
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletNfts } from '@nfteyez/sol-rayz-react'

import * as anchor from '@project-serum/anchor'

const PlantCard = ({ token }: any) => {
  const [metadata, setMetadata] = useState()
  useEffect(() => {
    ;(async () => {
      const json = await fetch(token.data.uri)
      setMetadata({
        ...(await json.json()),
        mint: token.mint,
      })
    })()
  }, [token])

  return metadata ? (
    <li>Token: {JSON.stringify(metadata)}</li>
  ) : (
    <li>Loading...</li>
  )
}

export default PlantCard
