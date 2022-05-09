import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import { Navigation } from 'swiper'
import 'swiper/swiper.scss' // core Swiper
import 'swiper/modules/navigation/navigation.scss' // Navigation module
import 'swiper/modules/pagination/pagination.scss' // Pagination module
import Card from './Card'
import { sliderImages } from 'src/helpers'

// cardData.map(card => {

//   return (
//     <div key={card.id} className="swiper-slide">
//       <div>{card.title} {card.text} <img src={card.img}/></div>
//     </div>
//   )
// })

const About = () => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  const [actilveSlide, setActilveSlide] = useState(0)

  const disableArrow = (swiper) => {
    if (swiper.realIndex === 0) {
      navigationPrevRef.current.style.pointerEvents = 'none'
      navigationPrevRef.current.style.opacity = '.5'
    } else {
      navigationPrevRef.current.style.pointerEvents = 'auto'
      navigationPrevRef.current.style.opacity = '1'
    }
  }

  return (
    <section className="about">
      <div className="wrapper">
        <hr />
        <div className="mobile-heading">
          <h2>What is Plantoids NFT?</h2>
          <p>
            Your Plantoid is a dynamic NFT. Each Plantoid will have unique
            traits and will grow with the passage of time.
          </p>
        </div>
        <div className="about__inner">
          <div className="about__card">
            <Card
              header
              kg="80"
              age="4"
              activeImage={sliderImages[actilveSlide]}
            />
          </div>
          <div className="about__content">
            <h2>What is Plantoids NFT?</h2>
            <p>
              Your Plantoid is a dynamic NFT. Each Plantoid will have unique
              traits and will grow with the passage of time.
            </p>
            <div className="about__slider">
              <Swiper
                spaceBetween={20}
                slidesPerView={`auto`}
                loop={true}
                // centeredSlides={true}
                onSlideChange={(swiper) => {
                  disableArrow(swiper)
                  setActilveSlide(swiper.realIndex)
                }}
                // onSwiper={(swiper) =>  console.log(swiper)}
                className="cards-slider"
                modules={[Navigation]}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current
                  swiper.params.navigation.nextEl = navigationNextRef.current
                }}

                // init={true}
              >
                <SwiperSlide>
                  <div className="slide-card">
                    <img src="./assets/leaf-2.svg" alt="" />
                    <h3>Growth function</h3>
                    <p>Your Plantoid grows with the passage of time</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-card">
                    <img src="./assets/leaf-3.svg" alt="" />
                    <h3>8 Different leaf types</h3>
                    <p>Your Plantoid grows with the passage of time</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-card">
                    <img src="./assets/honey.svg" alt="" />
                    <h3>10 Different pots</h3>
                    <p>Your Plantoid grows with the passage of time</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-card">
                    <img src="./assets/leaf-3.svg" alt="" />
                    <h3>12 Different pots</h3>
                    <p>Your Plantoid grows with the passage of time</p>
                  </div>
                </SwiperSlide>

                <div className="slider-nav">
                  <div className="arrow arrow-prev" ref={navigationPrevRef}>
                    <img src="./assets/arrow.svg" alt="" />
                  </div>
                  <div className="arrow arrow-next" ref={navigationNextRef}>
                    <img src="./assets/arrow.svg" alt="" />
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default About