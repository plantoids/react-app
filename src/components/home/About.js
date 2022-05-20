import React, { useRef, useState , useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import { Navigation } from 'swiper'
import 'swiper/swiper.scss' // core Swiper
import 'swiper/modules/navigation/navigation.scss' // Navigation module
import 'swiper/modules/pagination/pagination.scss' // Pagination module
import Card from './Card'
import { sliderImages } from 'src/helpers'
import gsap from 'gsap'

// cardData.map(card => {

//   return (
//     <div key={card.id} className="swiper-slide">
//       <div>{card.title} {card.text} <img src={card.img}/></div>
//     </div>
//   )
// })

const About = () => {


  useEffect(() => {
    gsap.to('.about', {
      translateY: 0,
      opacity: 1,
      duration: 1,
      delay: 1.2,
      ease: 'Power1.easeInOut',

    })

    return () => {}
  }, [])

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

  //check if src is .mp4 or .png


  return (
    <section className="about">
      <div className="wrapper">
        <hr />
        <div className="mobile-heading">
          <h2>What are Plantoids?</h2>
          <p>
            Plantoids are dynamic NFTs: they are digital plants with unique traits that grow with the passage of time.
          </p>
        </div>
        <div className="about__inner">
          <div className="about__card">
            <Card
              header
              kg="4.20"
              age="136"
              activeImage={sliderImages[actilveSlide]}
            />
          </div>
          <div className="about__content">
            <h2>What are Plantoids?</h2>
            <p>
            Plantoids are dynamic NFTs: they are digital plants with unique traits that grow with the passage of time.
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
                    <p>Your Plantoid will be growing everyday</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-card">
                    <img src="./assets/leaf-3.svg" alt="" />
                    <h3>5 Different leaf types</h3>
                    <p>Different and unique leaf styles</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-card">
                    <img src="./assets/honey.svg" alt="" />
                    <h3>5 Different pots</h3>
                    <p>Exclusive diamond pots for Plantoids Beta Generation</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-card">
                  <span className='coming-soon'>Coming soon</span>
                    <img src="./assets/leaf-3.svg" alt="" />
                    <h3>Weather feature</h3>
                    <p>Learn more about this feature in our Whitepaper</p>
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
