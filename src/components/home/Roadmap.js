import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.scss' // core Swiper
import 'swiper/modules/navigation/navigation.scss' // Navigation module
import 'swiper/modules/pagination/pagination.scss' // Pagination module

const DATA = [
  {
    heading: 'Q1 2022',
    checkedText: [
      'Plantoids Alpha Version',
      'Whitepaper',
      'Twitter',
      'Discord (invite-only)',
      'Website release',
    ],
    text: [],
  },
  {
    heading: 'Q2 Q3 2022',

    checkedText: ['New website release', 'Plantoids OG reveal', 'Plantoids OG whitelist acceptance starts', 'Plantoids OG minting date', 'Plantoids DApp (NFT Personal Area)',],

    text: [],
  },
  {
    heading: 'Q4 2022',

    checkedText: ['The Lab opens with Mutations', 'First 1000 Kg CO2 Captured'],

    text: [
      'Phase 2 minting date',
      'Plantoids Leadership Board',
      'Sustainable Plantoids merch drop',
      'Community events and WL giveaways for holders',
      'A lot more to be announced...',
    ],
  },
]

const Roadmap = () => {
  return (
    <div className="roadmap">
      <div className="wrapper">
        <div className="roadmap__inner">
          <h2>Roadmap</h2>

          <div className="roadmap__cards">
            <Swiper
              spaceBetween={10}
              slidesPerView={1.1}
              centeredSlides={true}
              className="roadmap__slider"
              initialSlide={1}
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
