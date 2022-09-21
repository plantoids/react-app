import React from 'react'
const Card = ({ header, kg, age, children, activeImage }) => {


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
          {/* <div className="card__body__text">
            <p>UNREVEALED PLANTOID</p>
          </div> */}
          <figure>
            {(activeImage || '').indexOf('mp4') > -1 ? (
              <video
                src={
                  activeImage
                    ? activeImage
                    : './assets/growing-plantoid-gif1.mp4'
                }
                alt=""
                autoPlay="autoplay"
                muted="muted"
                loop="loop"
                playsinline=""
              />
            ) : (
              <img
                src={
                  activeImage
                    ? activeImage
                    : './assets/growing-plantoid-gif.gif'
                }
                alt=""
              />
            )}
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
          <p>CO<sub>2</sub> REMOVEd</p>
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
