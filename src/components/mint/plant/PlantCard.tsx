import React from 'react'

import CandyMachine from 'src/components/mint/candymachine/App'
import 'src/components/mint/plant/PlantCard.css'

const IMAGE_URL = './assets/nft-placeholder.jpg'

interface PlantCardProps {
  co2captured?: number
  age?: number
}

const PlantCard = (props: PlantCardProps) => {
  const { co2captured, age } = props

  const emptyStat = (
    <span>
      <div className="empty-stat" />
    </span>
  )

  return (
    <div className="plant-card-container">
      <img className="image" src={IMAGE_URL} alt="Plantoid" />
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
      <CandyMachine />
    </div>
  )
}

export default PlantCard
