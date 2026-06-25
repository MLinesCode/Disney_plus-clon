import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/', label: 'HOME', icon: '/images/home-icon.svg' },
  { href: '/search', label: 'SEARCH', icon: '/images/search-icon.svg' },
  { href: '/watchlist', label: 'WATCHLIST', icon: '/images/watchlist-icon.svg' },
  { href: '/originals', label: 'ORIGINALS', icon: '/images/original-icon.svg' },
  { href: '/movies', label: 'MOVIES', icon: '/images/movie-icon.svg' },
  { href: '/series', label: 'SERIES', icon: '/images/series-icon.svg' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <Nav
        as={motion.nav}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        $scrolled={scrolled}
      >
        <Link to="/" aria-label="Disney+ Home">
          <Logo
            as={motion.img}
            src="/images/logo.svg"
            alt="Disney+"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          />
        </Link>

        <NavMenu>
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.2, duration: 0.4 }}
            >
              <NavLink
                to={link.href}
                $active={location.pathname === link.href}
              >
                <img src={link.icon} alt="" />
                <span>{link.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </NavMenu>

        <RightSection>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <UserImg
              as={motion.img}
              src="https://res.cloudinary.com/mlinescode/image/upload/v1620692288/profilee_z93ygw.webp"
              alt="Profile"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
          </motion.div>

          <HamburgerButton
            as={motion.button}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.9 }}
          >
            <HamburgerIcon open={menuOpen} />
          </HamburgerButton>
        </RightSection>
      </Nav>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <Backdrop
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <MobileMenu
              as={motion.div}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <MobileMenuHeader>
                <UserImg
                  src="https://res.cloudinary.com/mlinescode/image/upload/v1620692288/profilee_z93ygw.webp"
                  alt="Profile"
                />
                <span>My Profile</span>
              </MobileMenuHeader>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <MobileNavLink to={link.href} $active={location.pathname === link.href}>
                    <img src={link.icon} alt="" />
                    <span>{link.label}</span>
                  </MobileNavLink>
                </motion.div>
              ))}
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <motion.rect
        x="0" y="0" width="22" height="2" rx="1" fill="white"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{ originX: '50%', originY: '50%' }}
      />
      <motion.rect
        x="0" y="7" width="22" height="2" rx="1" fill="white"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.rect
        x="0" y="14" width="22" height="2" rx="1" fill="white"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{ originX: '50%', originY: '50%' }}
      />
    </svg>
  )
}

export default Header

const Nav = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  padding: 0 36px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${({ $scrolled }) =>
    $scrolled
      ? 'rgba(9,11,19,0.95)'
      : 'linear-gradient(to bottom, rgba(9,11,19,0.9) 0%, transparent 100%)'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(12px)' : 'none')};
  -webkit-backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(12px)' : 'none')};
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none'};
  transition: background 350ms ease, backdrop-filter 350ms ease, border-color 350ms ease;

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`

const Logo = styled.img`
  width: 80px;
  cursor: pointer;
  display: block;

  @media (max-width: 480px) {
    width: 65px;
  }
`

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 20px;
  align-items: center;
  gap: 2px;

  @media (max-width: 900px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  color: ${({ $active }) => ($active ? 'white' : 'rgba(249,249,249,0.78)')};
  background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.08)' : 'transparent')};
  transition: background 200ms ease, color 200ms ease;

  img {
    height: 18px;
    opacity: ${({ $active }) => ($active ? 1 : 0.75)};
    transition: opacity 200ms ease;
  }

  span {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.4px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -4px;
      height: 2px;
      background: white;
      border-radius: 1px;
      opacity: ${({ $active }) => ($active ? 1 : 0)};
      transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
      transform-origin: left center;
      transition: transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
        opacity 250ms ease;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: white;

    img {
      opacity: 1;
    }

    span::after {
      transform: scaleX(1);
      opacity: 1;
    }
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.15);
  object-fit: cover;
  transition: border-color 200ms ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }
`

const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  padding: 6px;
  border-radius: 8px;
  line-height: 0;
  transition: background 200ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 150;
  backdrop-filter: blur(2px);
`

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(320px, 85vw);
  background: #0d1026;
  z-index: 200;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.6);
  border-left: 1px solid rgba(255, 255, 255, 0.06);
`

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 24px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 8px;

  span {
    font-weight: 700;
    font-size: 15px;
  }
`

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 24px;
  color: ${({ $active }) => ($active ? 'white' : 'rgba(249,249,249,0.7)')};
  background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.06)' : 'transparent')};
  border-left: 3px solid ${({ $active }) => ($active ? 'var(--color-accent)' : 'transparent')};
  transition: all 200ms ease;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.2px;

  img {
    height: 20px;
    opacity: ${({ $active }) => ($active ? 1 : 0.6)};
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: white;

    img {
      opacity: 1;
    }
  }
`
