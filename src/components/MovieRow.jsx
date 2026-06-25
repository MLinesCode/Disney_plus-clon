import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function MovieRow({ title, movies }) {
  const navigate = useNavigate()

  return (
    <Section>
      <SectionHeader
        as={motion.div}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <Title>{title}</Title>
        <SeeAll
          as={motion.button}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onClick={() => navigate('/')}
        >
          See all ›
        </SeeAll>
      </SectionHeader>

      <Grid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {movies.map((movie) => (
          <Card
            key={movie.id}
            as={motion.div}
            variants={cardVariants}
            whileHover={{
              scale: 1.06,
              zIndex: 2,
              transition: { type: 'spring', stiffness: 300, damping: 18 },
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/detail/${movie.id}`)}
          >
            <CardInner>
              <img
                src={movie.poster}
                alt={movie.title}
                loading="lazy"
                decoding="async"
              />
              <CardOverlay>
                <PlayIcon>▶</PlayIcon>
              </CardOverlay>
            </CardInner>
            <CardTitle>{movie.title}</CardTitle>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}

export default MovieRow

const Section = styled.section`
  margin-top: 44px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const Title = styled.h4`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: var(--color-text);

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

const SeeAll = styled.button`
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  padding: 4px 0;
  transition: color 200ms ease;
  font-family: inherit;

  &:hover {
    color: white;
  }
`

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }
`

const CardInner = styled.div`
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 3px solid var(--color-border);
  box-shadow: var(--shadow-card);
  aspect-ratio: 16 / 9;
  transition: border-color 250ms ease, box-shadow 250ms ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 400ms ease;
  }
`

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 250ms ease;
  backdrop-filter: blur(2px);
`

const PlayIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #040714;
  padding-left: 3px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`

const Card = styled(motion.div)`
  cursor: pointer;

  &:hover ${CardInner} {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-card-hover);

    img {
      transform: scale(1.06);
    }
  }

  &:hover ${CardOverlay} {
    opacity: 1;
  }
`

const CardTitle = styled.p`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 200ms ease;

  ${Card}:hover & {
    color: var(--color-text);
  }
`
