import React from 'react'
import About from './About'
import Hero from './Hero'




export const HomePage = () => {
  return (

    <main className='home'>
      <Hero/>
      <About/>



      {/* <WalletMultiButton /> */}
      {/* <WalletDisconnectButton /> */}
   
    </main>
  )
}
