import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { sliderItems } from '../data/movies'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 260, damping: 28 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.4 },
    },
  },
  exit: (dir) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: 'spring', stiffness: 260, damping: 28 },
      opacity: { duration: 0.25 },
    },
  }),
}

function ImgSlider() {
  const [[page, direction], setPage] = useState([0, 0])
  const [hovering, setHovering] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragX = useRef(0)

  const slideIndex = wrap(0, sliderItems.length, page)

  const paginate = useCallback(
    (dir) => setPage(([p]) => [p + dir, dir]),
    []
  )

  // Auto-advance
  useEffect(() => {
    if (hovering) return
    const id = setInterval(() => paginate(1), 5500)
    return () => clearInterval(id)
  }, [hovering, paginate])

  const handleDragStart = (_, info) => {
    setDragging(true)
    dragX.current = info.point.x
  }

  const handleDragEnd = (_, info) => {
    setDragging(false)
    const delta = info.point.x - dragX.current
    if (Math.abs(delta) > 50) paginate(delta < 0 ? 1 : -1)
  }

  return (
    <Wrapper onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <Track>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <Slide
            key={page}
            as={motion.div}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          >
            <img
              src={sliderItems[slideIndex].image}
              alt={sliderItems[slideIndex].title}
              draggable={false}
            />
            <SlideOverlay />
          </Slide>
        </AnimatePresence>
      </Track>

      {/* Arrow buttons */}
      <ArrowBtn
        as={motion.button}
        $side="left"
        onClick={() => paginate(-1)}
        whileHover={{ scale: 1.05, background: 'rgba(9,11,19,0.9)' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous"
      >
        ‹
      </ArrowBtn>
      <ArrowBtn
        as={motion.button}
        $side="right"
        onClick={() => paginate(1)}
        whileHover={{ scale: 1.05, background: 'rgba(9,11,19,0.9)' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next"
      >
        ›
      </ArrowBtn>

      {/* Dot indicators */}
      <Dots>
        {sliderItems.map((_, i) => (
          <Dot
            key={i}
            as={motion.button}
            $active={i === slideIndex}
            onClick={() => setPage(([p]) => [i, i > slideIndex ? 1 : -1])}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.85 }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </Dots>

      {/* Progress bar */}
      {!hovering && (
        <ProgressBar
          key={`progress-${page}`}
          as={motion.div}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5.5, ease: 'linear' }}
        />
      )}
    </Wrapper>
  )
}

export default ImgSlider

const Wrapper = styled.div`
  position: relative;
  margin-top: 20px;
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  user-select: none;
`

const Track = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-card);
  aspect-ratio: 16 / 6;

  @media (max-width: 768px) {
    aspect-ratio: 16 / 9;
  }
`

const Slide = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }
`

const SlideOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(4, 7, 20, 0.6) 0%,
    transparent 40%,
    transparent 70%,
    rgba(4, 7, 20, 0.4) 100%
  );
`

const ArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left: 16px;' : 'right: 16px;')}
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(9, 11, 19, 0.6);
  color: white;
  font-size: 26px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 200ms ease;
  z-index: 2;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
`

const Dots = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`

const Dot = styled.button`
  width: ${({ $active }) => ($active ? '24px' : '8px')};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${({ $active }) => ($active ? 'white' : 'rgba(255,255,255,0.35)')};
  cursor: pointer;
  padding: 0;
  transition: width 300ms ease, background 200ms ease;
`

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(to right, var(--color-accent), #6c63ff);
  transform-origin: left center;
  z-index: 3;
`
