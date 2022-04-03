import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from 'src/components/home'

declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
