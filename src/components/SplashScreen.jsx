import React, { useEffect, useRef, useState } from 'react'
import { Player } from '@remotion/player'
import { motion, AnimatePresence } from 'framer-motion'
import { DisneyIntro } from '../remotion/DisneyIntro'

const DURATION_FRAMES = 120
const FPS = 30

function SplashScreen({ onComplete }) {
  const [showing, setShowing] = useState(true)
  const playerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.play()
      }
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  const handleEnded = () => setShowing(false)

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {showing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#040714',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Player
            ref={playerRef}
            component={DisneyIntro}
            durationInFrames={DURATION_FRAMES}
            fps={FPS}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{
              width: '100vw',
              height: '56.25vw',
              maxHeight: '100vh',
              maxWidth: `${(100 / 56.25) * 100}vh`,
            }}
            controls={false}
            showVolumeControls={false}
            loop={false}
            onEnded={handleEnded}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
