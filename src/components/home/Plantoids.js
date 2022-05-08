import React from 'react'

const Plantoids = () => {
  return (
    <div className="plantoids">
      <div className="wrapper">
        <div className="plantoids__inner">
          <h2>About Plantoids</h2>
          <p>
            Plantoids is a Solana-based platform to facilitate everyone remove
            the global CO2 emissions in exchange for dynamic NFTs in the shape
            of digital plants
          </p>
          <div className="plantoids__cards">
            <div className="plantoids__card">
              <span className="plantoids__red-bg">
                <img src="./assets/heart.svg" alt="heart" />
              </span>
              <h3>Mission</h3>
              <p>
                Our ambition is to become the plant factory of the Metaverse and
                fill out every corner of the internet with a CO2-capturing
                crypto-plants.{' '}
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.plantoids.io/"
              >
                <img src="./assets/link-arrow.svg" alt="link" />
                Learn more
              </a>
            </div>

            <div className="plantoids__card">
              <span className="plantoids__green-bg">
                <img src="./assets/leaf.svg" alt="" />
              </span>

              <h3>How does Plantoids removes CO2?</h3>
              <p>
                We partner with a carbon removal company to capture a
                significant multiple of a plant’s natural absorption rate.
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.plantoids.io/"
              >
                <img src="./assets/link-arrow.svg" alt="link" />
                Learn more
              </a>
            </div>
          </div>
          <div className="partners">
            <p>Partners & Advisors</p>
            <div>
              <img src="./assets/partners-logo-1.png" alt="" />
              <img src="./assets/partners-logo-2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plantoids
