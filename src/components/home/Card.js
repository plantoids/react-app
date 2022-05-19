import React, {useState} from 'react'

const Card = ({ header, kg, age, children, activeImage }) => {

  const [loaded, setLoaded] = useState(false)


  return (
    <>
      <div className="card">
        {header ? (
          <div className="card__header">
            <div className="card__header__text">
              <img src="./assets/og_icon.svg" alt="" />
              <div>
                <p>Plantoid</p>
                <span>#1010</span>
              </div>
            </div>
            <div className="card__header__info">
              <img src="./assets/info.svg" alt="" />
            </div>
          </div>
        ) : null}
        <div className="card__body">
          <div className="card__body__text">
            <p>UNREVEALED PLANTOID</p>
          </div>
          <figure>
            <img
              style={loaded ? {} : { display: 'none' }}
              src={activeImage ? activeImage : './assets/growing-plantoid-gif.gif'}
              alt=""
              onLoad={() => setLoaded(true)}
            />
          </figure>
        </div>
      </div>

      <div className="card-stats">
        <div className="card-stats__stat">
          <h2>
            <img src="./assets/leaf.svg" alt="" />
            <span>
              {kg}kg/CO<sub>2</sub>
            </span>
          </h2>
          <p>TOTAL CO2 REMOVEd</p>
        </div>
        <div className="card-stats__stat">
          <h2>{age} days old</h2>
          <p>Age</p>
        </div>
      </div>
      {children}
    </>
  )
}

export default Card
