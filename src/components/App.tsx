import React from 'react'

import '../styles/app.scss'
import { HomePage } from 'src/components/home'

// eslint-disable-next-line
declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <>
      <HomePage />
    </>
  )
}

export default App
