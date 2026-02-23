import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PortalHome from './components/PortalHome'
import NeburaReader from './components/NeburaReader'
import SakuraList from './components/SakuraList'
import SakuraReader from './components/SakuraReader'
import SakuraWiki from './components/SakuraWiki'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortalHome />} />
        <Route path="/nebura" element={<NeburaReader />} />
        <Route path="/sakura" element={<SakuraList />} />
        <Route path="/sakura/chapter/:id" element={<SakuraReader />} />
        <Route path="/sakura/wiki" element={<SakuraWiki />} />
      </Routes>
    </Router>
  )
}

export default App
