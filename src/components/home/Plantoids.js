import React from 'react'

const Plantoids = () => {
  return (
    <div className="plantoids">
      <div className="wrapper">
        <div className="plantoids__inner">
          <h2>About Plantoids</h2>
          <p>
            Plantoids is a Solana-based platform to facilitate everyone remove
          the global CO<sub>2</sub> emissions in exchange for dynamic NFTs in the shape
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
                fill out every corner of the internet with plants that save the
                real world.
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.plantoids.io/plantoids/vision"
              >
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity=".6"
                    d="M11.931.62c-.11-.25-.3-.44-.54-.54a.867.867 0 0 0-.38-.08h-10c-.56 0-1 .44-1 1 0 .55.44 1 1 1h7.59l-8.3 8.29c-.4.38-.4 1.02-.01 1.41h-.01c.38.39 1.02.39 1.41 0v-.01l8.29-8.3v7.59c0 .55.44 1 1 1 .55 0 1-.45 1-1v-10a1.17 1.17 0 0 0-.08-.38l.03.02Z"
                    fill="#747475"
                  />
                </svg>
                Learn more about our mission
              </a>
            </div>

            <div className="plantoids__card">
              <span className="plantoids__green-bg">
                <img src="./assets/leaf.svg" alt="" />
              </span>

              <h3>How do Plantoids work?</h3>
              <p>
                We use a combination of unique genetics, external sources of true randomness, and L-systems to simulate the dynamic and unpredictable growth of plants. Check out our Whitepaper for more details.
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.plantoids.io/plantoids-nft/what-were-building"
              >
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity=".6"
                    d="M11.931.62c-.11-.25-.3-.44-.54-.54a.867.867 0 0 0-.38-.08h-10c-.56 0-1 .44-1 1 0 .55.44 1 1 1h7.59l-8.3 8.29c-.4.38-.4 1.02-.01 1.41h-.01c.38.39 1.02.39 1.41 0v-.01l8.29-8.3v7.59c0 .55.44 1 1 1 .55 0 1-.45 1-1v-10a1.17 1.17 0 0 0-.08-.38l.03.02Z"
                    fill="#747475"
                  />
                </svg>
                Read the Whitepaper
              </a>
            </div>
          </div>
          <div className="partners">
            <p>Partners & Advisors</p>
            <div>
            <a target="_blank" rel="noreferrer" href="https://desolate.space">
              <img src="./assets/partners-logo-1.png" alt="" /> </a>
            <a target="_blank" rel="noreferrer" href="https://crossmint.io">
              <img src="./assets/partners-logo-2.png" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plantoids
