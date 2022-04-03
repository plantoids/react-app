import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from 'src/redux'
import { HomePage } from 'src/components/home'

declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <Provider store={store}>
        <Router>
          <p>I am the app :D</p>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App
