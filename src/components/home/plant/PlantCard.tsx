import React, { useState, useEffect, useMemo } from 'react'
import { NftTokenAccount } from '@nfteyez/sol-rayz-react'
import moment from 'moment'

import * as anchor from '@project-serum/anchor'
import 'src/components/home/plant/PlantCard.css'

const DEFAULT_IMAGE_URL = './assets/nft-placeholder.jpg'

interface PlantCardProps {
  token: NftTokenAccount
}

interface NftTokenMetadata {
  name: string //"Plantoid #028",
  symbol: string //"PLANT",
  description: string //"Digital native plants that evolve over time and capture CO2",
  seller_fee_basis_points: number //1000,
  image: string //"https://arweave.net/mZRbjVG60S1vq0iArjHdHQSfaudtPKXkEtiXoWtJtiA?ext=png",
  animation_url: string //"https://arweave.net/neTKFbh8u6sZlzXq9cGJ1j3-FEAQf6nB4TOsp7M5zL0?ext=png",
  external_url: string //"https://www.plantoids.io/OG.png",
  attributes: any[]
  collection: {
    name: string //"Plantoids | OG edition",
    family: string //"Plantoids"
  }
  properties: {
    creators: any[]
  }
  mint: string //"GMzzLqHCXyED22VdEzrabi4uWcMYEGG7WGR5CoswW2KP"
}

type NftTokenMetadataAttributes = {
  birthday?: string // '2022-5-4',
  randomSeed?: number // 8736521647423441,
  generation?: number // string; // 4,
  initialStemWidth?: number // 8,
  initialStemLength?: number // 55,
  flower?: number // 0,
  baseFlowerDimension?: number // 20,
  leaf?: number // 7,
  baseLeafDimension?: number // 81,
  pot?: number // 0,
  potDimension?: number // 100,
  growthRate?: number // 5,
  sunTolerance?: number // 1,
  rainTolerance?: number // 5,
}

const PlantCard = ({ token }: PlantCardProps) => {
  const [metadata, setMetadata] = useState<NftTokenMetadata>()
  useEffect(() => {
    ;(async () => {
      const json = await fetch(token.data.uri)
      setMetadata({
        ...(await json.json()),
        mint: token.mint,
      })
    })()
  }, [token])

  const metadataAttributes = useMemo(() => {
    const attributes: NftTokenMetadataAttributes = {}
    metadata?.attributes.forEach(({ trait_type, value }) => {
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
          <img src="assets/edition/OG.svg" alt="OG" />
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
            <img src="assets/view-button.svg" alt="link" />
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
            <span>🌿 {co2captured}kg/co₂</span>
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
      <button className="wallet-adapter-button">Inspect Your Plant</button>
    </div>
  )
}

export default PlantCard
