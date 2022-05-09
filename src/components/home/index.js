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


gsap.registerPlugin(ScrollTrigger)

export const HomePage = () => {
  const darkSectionRef = useRef()

  useEffect(() => {
    
    // if (typeof window !== `undefined`) {
    //   gsap.registerPlugin(ScrollTrigger)
    //   gsap.core.globals('ScrollTrigger', ScrollTrigger)
    // }

    ScrollTrigger.create({
      trigger: '.pin-section',
      start: 'bottom bottom',
      endTrigger: darkSectionRef.current,
      pin: true,
      pinSpacing: false,
    })

    return () => {
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <main className="home">
      <Hero />
      <div className="pin-section">
        <About />
      </div>
      <div className="dark-section" ref={darkSectionRef}>
        <Benefits />
        <Roadmap />
        <Faq/>
        <Plantoids/>
        <Footer/>
      </div>

      {/* <WalletMultiButton /> */}
      {/* <WalletDisconnectButton /> */}
    </main>
  )
}
