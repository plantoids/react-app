import React from 'react'
import Card from './Card'

const About = () => {
  return (
    <section className="about">
      <div className="wrapper">
        <hr />
        <div className="about__inner">
          <div className="about__card">
            <Card header kg="80" age="4" />
          </div>
          <div className="about__content">
            <h2>What is Plantoids NFT?</h2>
            <p>
              Your Plantoid is a dynamic NFT. Each Plantoid will have unique
              traits and will grow with the passage of time.
            </p>
            <div className='about__slider'>
              <p>Slider</p>
          </div>
          </div>

        </div>
      </div>
    </section>
  )
}
export default About
