import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.scss' // core Swiper
import 'swiper/modules/navigation/navigation.scss' // Navigation module
import 'swiper/modules/pagination/pagination.scss' // Pagination module
import {Link } from 'react-router-dom'

const DATA = [
  {
    heading: 'Q4 2022',
    checkedText: [
      'Plantoids Story Development',
      'Mutagen Free Mint',
    ],
    text: [
      'Plantoids Phase 2 OG Mint',
      'The Lab Developments',
      'Imagine Your Plantoid, 1/1 Art with artists in the space',
      'First Merch designs and ideas',
    ],
  },
  {
    heading: 'Q1 2023',

    checkedText: [],

    text: [
      'Further Lab Developments:',
      'More Mutation-only traits',
      'Watering Feature',
      'Fertilizing',
      'Token Integration',
      'Sustainable Merch Drop'
    ],
  },
  {
    heading: 'Q2 2023',

    checkedText: [],

    text: [
      'Plantoids Traits Marketplace: \n 1/1 Pots and Backgrounds',
      'Integrations Development',
      'Scientist PFP story development',
      'Scientist PFP artwork',
      '100,000 Kg CO2 removed Milestone',
    ],
  },
]

const Roadmap = () => {
  return (
    <div className="roadmap">
      <div className="wrapper">
        <div className="roadmap__inner">
          <h2>
            <Link to="/Roadmap" target="_blank">Roadmap</Link>
          </h2>

          <div className="roadmap__cards">
            <Swiper
              spaceBetween={10}
              slidesPerView={1.1}
              centeredSlides={true}
              className="roadmap__slider"
              initialSlide={0}
              breakpoints={{
                // when window width is >= 640px
                980: {
                  centeredSlides: false,
                  slidesPerView: 3,
                },
                640: {
                  centeredSlides: false,
                  slidesPerView: 2,
                },
                // when window width is >= 768px
              }}
            >
              {DATA.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="roadmap__card">
                      <h1>{item.heading}</h1>

                      <div className="roadmap__card__item">
                        <>
                          {item.checkedText &&
                            item.checkedText.map((text, index) => {
                              return (
                                <div key={index} className="checked-text">
                                  <img src="./assets/check-mark.svg" alt="" />
                                  <p>{text}</p>
                                </div>
                              )
                            })}

                          {item.text.map((text, index) => {
                            return (
                              <div key={index}>
                                <span></span>
                                <p>{text}</p>
                              </div>
                            )
                          })}
                        </>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
