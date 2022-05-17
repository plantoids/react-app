import React, { useEffect } from 'react'
import gsap from 'gsap'
import Card from './Card'

const Hero = () => {

  useEffect(() => {
    gsap.to('.hero', {
      translateY: 0,
      opacity: 1,
      duration: 1.2,
      delay: .3,
      ease: 'power2.out',
    })

    return () => {}
  }, [])

  return (
    <section className="hero">
      <div className="wrapper">
        <div className="hero__inner">
          <div className="hero__info">
            <h1>Mint a Plantoid,</h1>
            <h1>
              remove
              <span>
                <img src="./assets/leaf.svg" alt="" />
              </span>
              CO<sub>2</sub>
            </h1>
            <p>
              Plantoids are digital collectible NFTs that captures CO₂ at a rate 100x higher than real plants.{' '}
            </p>
            <div className="hero__socials">
              <h4>Join and get access to the Beta</h4>
              <div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/PlantoidsNFT"
                >
                  <img src="./assets/twitter-logo-blue.svg" alt="twitter" />
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
            <Card kg="1.69" age="54">
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
