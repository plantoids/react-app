import React from 'react'
import Card from './Card'

const Hero = () => {
  return (
    <section className="hero">
      <div className="wrapper">
        <div className="hero__inner">
          <div className="hero__info">
            <h1>Mint a Plantoid</h1>
            <h1>
              remove
              <span>
                <img src="./assets/leaf.svg" alt="" />
              </span>
              CO<sub>2</sub>
            </h1>
            <p>
              Plantoids are digital collectible NFTs that help save the
              environment.{' '}
            </p>
            <div className="hero__socials">
              <h4>Be the first one to know</h4>
              <div>
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
              </div>
            </div>
          </div>
          <div className="hero__card">
            <Card kg="50" age="3">
              <div className="tba">
                <p>Mint TBA</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero