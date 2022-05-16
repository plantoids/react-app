import React, { useState, useEffect, useMemo } from 'react'
import { NftTokenAccount } from '@nfteyez/sol-rayz-react'
import moment from 'moment'

import * as anchor from '@project-serum/anchor'
import {
  NftTokenMetadata,
  NftTokenMetadataAttributes,
} from 'src/lib/NftTokenMetadata'
import 'src/components/home/PlantDetails.css'

const DEFAULT_IMAGE_URL = './assets/nft-placeholder.jpg'

interface PlantDetailsProps {
  token: NftTokenAccount
  owner: string
}

const PlantDetails = (props: PlantDetailsProps) => {
  const [metadata, setMetadata] = useState<NftTokenMetadata>({})
  useEffect(() => {
    ;(async () => {
      console.log(
        'PlantDetails',
        'fetching...',
        props.token.data.uri,
        props.token.data
      )
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

  console.log('PlantDetails', 'metadata', metadata)
  console.log('PlantDetails', 'attributes', metadataAttributes)

  const { leaf, pot, generation } = metadataAttributes
  const birthday = moment(metadataAttributes.birthday)
  const age = moment().diff(birthday, 'days')
  const co2captured = 31 * age

  const emptyStat = (
    <span>
      <div className="empty-stat" />
    </span>
  )

  return (
    <div className="plant-details-container">
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
            <span>
              <img src="assets/icons/leaf.svg" alt="leaf" /> {co2captured}kg/co₂{' '}
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
        <div className="stat-light">
          {leaf !== undefined ? <span>{leaf}</span> : emptyStat}
          <span>leaf type</span>
        </div>
        <div className="stat-light">
          {pot !== undefined ? <span>{pot}</span> : emptyStat}
          <span>pot type</span>
        </div>
        <div className="stat-light">
          {generation !== undefined ? <span>{generation}</span> : emptyStat}
          <span>generation</span>
        </div>
        <div className="stat-light">
          {birthday !== undefined ? (
            <span>{birthday.format('MM/DD/YYYY')}</span>
          ) : (
            emptyStat
          )}
          <span>birthday</span>
        </div>
      </div>
      <div className="owner">
        <span>owner</span>
        <span>
          {`${props.owner.slice(0, 5)}...${props.owner.slice(-6)}`}
          <img src="assets/icons/wallet" alt="wallet" />
        </span>
        <span>signature</span>
        <span>
          <a href="/signature">
            View in Solscan
            <img src="assets/icon/link" alt="link" />
          </a>
        </span>
      </div>
      <div className="actions">
        <a href="/remove">Remove more CO2</a>
        <button>
          <img src="assets/view-button.svg" alt="link" />
          Go to your Plantoid
        </button>
      </div>
    </div>
  )
}

export default PlantDetails
