import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.scss' // core Swiper
import 'swiper/modules/navigation/navigation.scss' // Navigation module
import 'swiper/modules/pagination/pagination.scss' // Pagination module

const DATA = [
  {
    heading: 'Q2 2022',
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
    heading: 'Q3 2022',

    checkedText: ['Whitelist acceptance'],

    text: [
      'OG Generation reveal',
      'Plantoids Leadership Board',
      'OG Whitelist Mint',
      'New Landing page release',
    ],
  },
  {
    heading: 'Q4 2022',

    checkedText: [],

    text: [
      'Marketplace',
      'Plantoids Leadership Board',
      'New Partner announcement',
      'Sustainable Plantoids merch drop',
      'Community events and WL giveaways for holders',
    ],
  },
]

console.log(DATA)
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
                  <SwiperSlide>
                    <div key={index} className="roadmap__card">
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
