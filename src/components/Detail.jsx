import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { detailMovie } from '../data/movies'

const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const GENRES = ['Action', 'Adventure', 'Sci-Fi', 'Fantasy']

function Detail() {
  const navigate = useNavigate()

  return (
    <Container
      as={motion.div}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <Background>
        <motion.img
          src={detailMovie.background}
          alt=""
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <BackgroundGradient />
      </Background>

      <ContentWrapper>
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <ImageTitle>
              <img src={detailMovie.logo} alt="Movie title" />
            </ImageTitle>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Meta>
              <MetaBadge>PG-13</MetaBadge>
              <MetaBadge>2021</MetaBadge>
              <MetaBadge>2h 16m</MetaBadge>
              <MetaBadge $accent>4K UHD</MetaBadge>
            </Meta>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Description>
              An incredible journey unfolds as heroes from across the multiverse band together
              to face an unprecedented threat. With stunning visuals and heart-pounding action,
              this epic adventure will leave you breathless.
            </Description>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Genres>
              {GENRES.map((g) => (
                <GenreTag key={g}>{g}</GenreTag>
              ))}
            </Genres>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Controls>
              <PlayButton
                as={motion.button}
                whileHover={{ scale: 1.04, background: 'rgb(220,220,220)' }}
                whileTap={{ scale: 0.97 }}
              >
                <img src="/images/play-icon-black.png" alt="" />
                <span>PLAY</span>
              </PlayButton>

              <TrailerButton
                as={motion.button}
                whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
              >
                <img src="/images/play-icon-white.png" alt="" />
                <span>TRAILER</span>
              </TrailerButton>

              <CircleButton
                as={motion.button}
                title="Add to Watchlist"
                whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.8)' }}
                whileTap={{ scale: 0.9 }}
              >
                <span>+</span>
              </CircleButton>

              <CircleButton
                as={motion.button}
                title="Group Watch"
                whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.8)' }}
                whileTap={{ scale: 0.9 }}
              >
                <img src="/images/group-icon.png" alt="Group Watch" />
              </CircleButton>
            </Controls>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <BackBtn
            as={motion.button}
            onClick={() => navigate('/')}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Home
          </BackBtn>
        </motion.div>
      </ContentWrapper>
    </Container>
  )
}

export default Detail

const Container = styled.div`
  min-height: 100vh;
  padding-top: var(--nav-height);
  position: relative;
`

const Background = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const BackgroundGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(4, 7, 20, 0.92) 0%,
    rgba(4, 7, 20, 0.65) 50%,
    rgba(4, 7, 20, 0.3) 100%
  ),
  linear-gradient(to top, rgba(4, 7, 20, 0.8) 0%, transparent 40%);
`

const ContentWrapper = styled.div`
  padding: 60px calc(3.5vw + 5px) 80px;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 40px 20px 60px;
    max-width: 100%;
  }
`

const ImageTitle = styled.div`
  width: 35vw;
  min-width: 220px;
  max-width: 480px;
  margin-bottom: 8px;

  img {
    width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.6));
  }

  @media (max-width: 768px) {
    width: 60vw;
    max-width: 300px;
  }
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

const MetaBadge = styled.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  background: ${({ $accent }) =>
    $accent ? 'rgba(17,60,207,0.5)' : 'rgba(255,255,255,0.12)'};
  border: 1px solid ${({ $accent }) =>
    $accent ? 'rgba(17,60,207,0.8)' : 'rgba(255,255,255,0.2)'};
  color: white;
`

const Description = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: rgba(249, 249, 249, 0.82);
  max-width: 520px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const Genres = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const GenreTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 4px 12px;
  transition: color 200ms ease, border-color 200ms ease;

  &:hover {
    color: white;
    border-color: rgba(255, 255, 255, 0.4);
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 52px;
  padding: 0 28px;
  border-radius: 6px;
  border: none;
  background: rgb(249, 249, 249);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 1.8px;
  color: #040714;
  cursor: pointer;
  transition: background 200ms ease;
  font-family: inherit;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  img {
    height: 20px;
  }
`

const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(249, 249, 249, 0.7);
  color: rgb(249, 249, 249);
  backdrop-filter: blur(8px);
`

const CircleButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: border-color 200ms ease;

  span {
    font-size: 26px;
    color: white;
    line-height: 1;
    margin-top: -2px;
  }

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
`

const BackBtn = styled.button`
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: color 200ms ease;
  margin-top: 12px;

  &:hover {
    color: white;
  }
`
