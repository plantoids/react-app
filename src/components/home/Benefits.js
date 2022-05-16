import React from 'react'

const Benefits = () => {
  return (
    <div className="benefits">
      <div className="wrapper">
        <div className="benefits__inner">
          <div className="benefits__title">
            <p>A CLIMATE-FRIENDLY BLOCKCHAIN PROJECT</p>
            <h2>By owning Plantoids, you are reducing CO<sub>2</sub> emissions</h2>
          </div>
          <div className="benefits__cards">
            <div className="benefits__cards__row">
              <div className="benefit-card green-bg">
                <img src="./assets/tree-icon.svg" alt="" />
                <h4>Environmental activities</h4>
                <p>
                  Funds from Plantoids are used to purchase CO<sub>2</sub> credits from our
                  partners, who use these funds to grow real trees, develop
                  renewable energy projects, etc to reduce global emissions.
                </p>
              </div>
              <div className="benefit-card pink-bg">
                <img src="./assets/hands.svg" alt="" />
                <h4>Partnerships</h4>
                <p>
                  We partner with established leaders in the carbon capturing
                  industry like Climeworks and Charm Industrial.
                </p>
              </div>
            </div>
            <div className="benefits__cards__row">
              <div className="benefit-card yellow-bg">
                <img src="./assets/solana-icon.png" alt="" />
                <h4>Low emissions blockchain</h4>
                <p>
                  Plantoids are built on Solana, a more modern and efficient
                  blockchain, with low emissions. A Plantoid consumes the
                  equivalent of an average house lightbulb being used for 5
                  minutes.
                </p>
              </div>
              <div className="benefit-card light-green-bg ">
                  <h5>GUARANTEED</h5>
                  <h2>100x</h2>
                  <p>Most proceeds from plantoids are donated such that each plantoid consumes CO<sub>2</sub> at a rate 100x higher than real plants</p>
                  <img src="./assets/flying-leafs.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Benefits
