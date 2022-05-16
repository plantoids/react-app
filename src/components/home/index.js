import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

//Components
import Hero from './Hero'
import About from './About'
import Benefits from './Benefits'
import Roadmap from './Roadmap'
import Faq from './Faq'
import Plantoids from './Plantoids'
import Footer from '../footer'
import Header from '../header'

gsap.registerPlugin(ScrollTrigger)

export const HomePage = () => {
  const darkSectionRef = useRef()
  const scroll = useRef()
  const pinSection = useRef()

  useEffect(() => {
    // if (typeof window !== `undefined`) {
    //   gsap.registerPlugin(ScrollTrigger)
    //   gsap.core.globals('ScrollTrigger', ScrollTrigger)
    // }


    const fadeOutTl = gsap.timeline({ paused: true })

    fadeOutTl.to(pinSection.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.pin-section',
        start: 'bottom bottom',
        end: 'bottom 10%',
        
        scrub: true,
      },
    })

    ScrollTrigger.create({
      trigger: '.pin-section',
      start: 'bottom bottom',
      endTrigger: darkSectionRef.current,
      pin: true,
      scrub: true,
      pinSpacing: false,
     
    })

    ScrollTrigger.create({
      trigger: darkSectionRef.current,
      start: 'top +5%',
      onEnter: () => {
        scroll.current.classList.add('scroll-active')
        if (scroll.current.classList.contains('scroll-active')) {
          // document.body.style.overflow = "hidden";

          setTimeout(() => {
            darkSectionRef.current.focus()
          }, 0);
         
        }
      },
      onLeaveBack: () => {
        scroll.current.classList.remove('scroll-active')
        // document.body.style.overflow = "auto";
      },
    })

    return () => {
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <>
      <Header />

      <main className="home">
        <div className="pin-section" ref={pinSection}>
          <Hero />
          <About />
        </div>
        <div className="dark-section" ref={darkSectionRef} >
          <div className="scroll" ref={scroll} >
            <Benefits />
            <Roadmap />
            <Faq />
            <Plantoids />
            <Footer />
          </div>
        </div>

        {/* <WalletMultiButton /> */}
        {/* <WalletDisconnectButton /> */}
      </main>
    </>
  )
}
