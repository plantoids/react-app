import React from 'react'

import CandyMachine from 'src/components/candymachine/App'
import PlantCard from 'src/components/plant/PlantCard'
import 'src/components/mint/MintPage.css'

const MintPage = () => {
  const mintButton = <CandyMachine />

  return (
    <div className="mint-page-container">
      <header>
        <span className="logo">
          <img src="./assets/plantoids-logo.svg" alt="plantoids logo" />
        </span>
        <span className="links">
          <a target="_blank" rel="noreferrer" href="https://docs.plantoids.io/">
            Whitepaper
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/PlantoidsNFT"
          >
            <img src="./assets/Twitter logo blue.svg" alt="twitter" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://discord.gg/uMTaKMaszq"
          >
            <img src="./assets/Discord-Logo-Color.svg" alt="discord" />
          </a>
        </span>
      </header>
      <h1>Mint your Plantoid</h1>
      <PlantCard actions={mintButton} />
    </div>
  )
}

export default MintPage
