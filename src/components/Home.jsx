import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ImgSlider from './ImgSlider'
import Viewers from './Viewers'
import Movies from './Movies'

const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
}

function Home() {
  return (
    <Container
      as={motion.main}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <ImgSlider />
      <Viewers />
      <Movies />
    </Container>
  )
}

export default Home

const Container = styled.main`
  min-height: calc(100vh - var(--nav-height));
  padding: var(--nav-height) calc(3.5vw + 5px) 60px;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    background: url('/images/home-background.png') center center / cover no-repeat fixed;
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: var(--nav-height) 16px 40px;
  }
`
