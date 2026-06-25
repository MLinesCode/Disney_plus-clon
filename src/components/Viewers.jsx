import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const BRANDS = [
  {
    id: 'disney',
    img: '/images/viewers-disney.png',
    video: '/videos/1564674844-disney.mp4',
    label: 'Disney',
    color: 'rgba(17,60,207,0.6)',
  },
  {
    id: 'pixar',
    img: '/images/viewers-pixar.png',
    video: '/videos/1564676714-pixar.mp4',
    label: 'Pixar',
    color: 'rgba(100,60,200,0.6)',
  },
  {
    id: 'marvel',
    img: '/images/viewers-marvel.png',
    video: '/videos/1564676115-marvel.mp4',
    label: 'Marvel',
    color: 'rgba(200,0,0,0.6)',
  },
  {
    id: 'starwars',
    img: '/images/viewers-starwars.png',
    video: '/videos/1608229455-star-wars.mp4',
    label: 'Star Wars',
    color: 'rgba(255,220,0,0.4)',
  },
  {
    id: 'natgeo',
    img: '/images/viewers-national.png',
    video: '/videos/1564676296-national-geographic.mp4',
    label: 'National Geographic',
    color: 'rgba(255,200,0,0.4)',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function Viewers() {
  return (
    <Section>
      <Container
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {BRANDS.map((brand) => (
          <BrandCard
            key={brand.id}
            as={motion.div}
            variants={cardVariants}
            whileHover={{ scale: 1.05, zIndex: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Inner $glowColor={brand.color}>
              <img src={brand.img} alt={brand.label} />
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              >
                <source src={brand.video} type="video/mp4" />
              </video>
              <Glow $color={brand.color} />
            </Inner>
          </BrandCard>
        ))}
      </Container>
    </Section>
  )
}

export default Viewers

const Section = styled.section`
  padding: 30px 0 20px;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
`

const BrandCard = styled(motion.div)`
  cursor: pointer;
  position: relative;
`

const Inner = styled.div`
  padding-top: 56.25%;
  border-radius: var(--radius-card);
  border: 3px solid var(--color-border);
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
  transition: border-color 250ms ease, box-shadow 250ms ease;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: opacity 450ms ease;
    z-index: 1;
  }

  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    z-index: 0;
    transition: opacity 450ms ease;
  }

  ${BrandCard}:hover & {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-card-hover), 0 0 30px ${({ $glowColor }) => $glowColor};

    img {
      opacity: 0;
    }

    video {
      opacity: 1;
    }
  }
`

const Glow = styled.div`
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: radial-gradient(ellipse at center, ${({ $color }) => $color} 0%, transparent 70%);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  transition: opacity 350ms ease;

  ${BrandCard}:hover & {
    opacity: 1;
  }
`
