import React, { useState, useEffect, useMemo } from 'react'
import { NftTokenAccount } from '@nfteyez/sol-rayz-react'
import moment from 'moment'

import * as anchor from '@project-serum/anchor'
import {
  NftTokenMetadata,
  NftTokenMetadataAttributes,
} from 'src/lib/NftTokenMetadata'
import 'src/components/home/PlantCard.css'

const DEFAULT_IMAGE_URL = './assets/nft-placeholder.jpg'

interface PlantCardProps {
  token: NftTokenAccount
  onInspect: () => void
}

const PlantCard = (props: PlantCardProps) => {
  const [metadata, setMetadata] = useState<NftTokenMetadata>()
  useEffect(() => {
    ;(async () => {
      const json = await fetch(props.token.data.uri)
      setMetadata({
        ...(await json.json()),
        mint: props.token.mint,
      })
    })()
  }, [props.token])

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
      <header>
        <span className="edition">
          <img src="/assets/editions/OG_40.svg" alt="OG" />
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
            <img src="/assets/view-button.svg" alt="link" />
          </a>
        </span>
      </header>
      <img
        className="image"
        src={metadata?.image || DEFAULT_IMAGE_URL}
        alt="Plantoid"
      />
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
      <button onClick={props.onInspect} className="wallet-adapter-button">
        Inspect Your Plant
      </button>
    </div>
  )
}

export default PlantCard
