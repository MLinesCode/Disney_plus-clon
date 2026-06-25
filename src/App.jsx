import React, { Suspense, lazy, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Home from './components/Home'
import Detail from './components/Detail'

const SplashScreen = lazy(() => import('./components/SplashScreen'))

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const hasSeenSplash = sessionStorage.getItem('disney-splash-done')
  const [splashDone, setSplashDone] = useState(!!hasSeenSplash)

  const handleSplashComplete = () => {
    sessionStorage.setItem('disney-splash-done', 'true')
    setSplashDone(true)
  }

  return (
    <>
      {!splashDone && (
        <Suspense fallback={null}>
          <SplashScreen onComplete={handleSplashComplete} />
        </Suspense>
      )}

      <div
        style={{
          opacity: splashDone ? 1 : 0,
          visibility: splashDone ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease',
        }}
      >
        <Router>
          <Header />
          <AnimatedRoutes />
        </Router>
      </div>
    </>
  )
}

export default App
