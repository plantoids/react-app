import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import '../styles/app.scss'
import { HomePage } from 'src/components/home'
import { Pdf } from "src/components/RoadmapPDF/Pdf"
// eslint-disable-next-line
declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <div >
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/mint" element={<MintPage />} /> */}
            <Route path='/Roadmap' element={<Pdf />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
