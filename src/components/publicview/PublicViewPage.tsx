import React from 'react'
import { useParams } from 'react-router-dom'

import 'src/components/publicview/PublicViewPage.css'
import PlantCard from 'src/components/publicview/PlantCard'

const HomePage = () => {
  let { mint } = useParams()

  return (
    <div className="public-view-page-container">
      <header className="navbar">
        <span className="logo">
          <img src="/assets/plantoids-logo.svg" alt="plantoids logo" />
        </span>
      </header>
      <PlantCard mint={mint!} />
      <div className="footer">
        Planted with love by <span className="logo">🌱 Plantoids</span>
      </div>
    </div>
  )
}

export default HomePage
