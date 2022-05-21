import React, { useState, useEffect, useMemo } from 'react'
import { getParsedAccountByMint } from '@nfteyez/sol-rayz'
import { useWalletNfts } from '@nfteyez/sol-rayz-react'
import moment from 'moment'

import * as anchor from '@project-serum/anchor'
import {
  NftTokenMetadata,
  NftTokenMetadataAttributes,
} from 'src/lib/NftTokenMetadata'
import 'src/components/publicview/PlantCard.css'

const DEFAULT_IMAGE_URL = './/assets/nft-placeholder.jpg'

interface PlantCardProps {
  mint: string
}

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet')
)

const PlantCard = (props: PlantCardProps) => {
  const [owner, setOwner] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const parsedAcount = await getParsedAccountByMint({
        mintAddress: props.mint,
        connection,
      })
      setOwner(parsedAcount.account.data.parsed.info.owner)
    })()
  }, [props.mint])

  const { nfts } = useWalletNfts({
    publicAddress: owner,
    connection,
  })

  const token = useMemo(
    () => nfts && nfts.find((nft: any) => nft.mint === props.mint),
    [nfts, props.mint]
  )

  const [metadata, setMetadata] = useState<NftTokenMetadata>()
  useEffect(() => {
    ;(async () => {
      if (!token) return
      const json = await fetch(token.data.uri)
      setMetadata({
        ...(await json.json()),
        mint: token.mint,
      })
    })()
  }, [token])

  const metadataAttributes = useMemo(() => {
    const attributes: NftTokenMetadataAttributes = {}
    metadata?.attributes?.forEach(({ trait_type, value }) => {
      attributes[trait_type as keyof NftTokenMetadataAttributes] = value
    })
    return attributes
  }, [metadata])

  const age = moment().diff(metadataAttributes.birthday, 'days')
  const co2captured = 31 * age

  const emptyStat = (
    <span>
      <div className="empty-stat" />
    </span>
  )

  return (
    <div className="plant-card-container">
      <div className="card-container">
        <header>
          <span className="edition">
            <img src="/assets/editions/OG_60.svg" alt="OG" />
          </span>
          <span className="plant-name">
            <h4>
              <span>
                Plantoid
                <br />
              </span>
              <span>#1010</span>
            </h4>
          </span>
          <span className="action">
            <a href="googe.com">
              <img src="/assets/info-button.svg" alt="link" />
            </a>
          </span>
        </header>
        <img
          className="image"
          src={metadata?.image || DEFAULT_IMAGE_URL}
          alt="Plantoid"
        />
      </div>
      <div className="stats">
        <div className="stat">
          {co2captured !== undefined ? (
            <span>
              <img src="/assets/icons/leaf.svg" alt="leaf" /> {co2captured}
              kg/co₂{' '}
            </span>
          ) : (
            emptyStat
          )}
          <span>co₂ removed</span>
        </div>
        <div className="stat">
          {age !== undefined ? <span>{age} day</span> : emptyStat}
          <span>age</span>
        </div>
      </div>
    </div>
  )
}

export default PlantCard
