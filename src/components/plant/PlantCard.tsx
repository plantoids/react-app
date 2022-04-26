import React from 'react'

import 'src/components/plant/PlantCard.css'

const IMAGE_URL = './assets/nft-placeholder.jpg'

interface PlantCardProps {
  co2captured?: number
  age?: number
  actions?: React.ReactNode
  containerStyle?: React.CSSProperties
}

const PlantCard = (props: PlantCardProps) => {
  const { actions, containerStyle, co2captured, age } = props

  const footer = actions && <div className="footer">{actions}</div>
  const emptyStat = (
    <span>
      <div className="empty-stat" />
    </span>
  )

  return (
    <div className="container" style={containerStyle}>
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
      {footer}
    </div>
  )
}

export default PlantCard
