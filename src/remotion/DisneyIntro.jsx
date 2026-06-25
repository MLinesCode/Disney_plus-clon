import React from 'react'
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion'

// Deterministic star field — stable across renders
const STARS = Array.from({ length: 220 }, (_, i) => ({
  x: ((i * 47.539 + 11) % 98).toFixed(3),
  y: ((i * 31.127 + 7) % 97).toFixed(3),
  size: (((i % 4) * 0.6 + 0.6)).toFixed(1),
  baseOpacity: (((i % 5) * 0.12 + 0.35)).toFixed(2),
  delay: Math.floor((i * 0.65) % 28),
  twinkleSpeed: ((i % 3) + 1) * 8,
}))

// Shooting stars
const SHOOTERS = Array.from({ length: 5 }, (_, i) => ({
  startX: ((i * 23.7) % 80).toFixed(1),
  startY: ((i * 17.3) % 40).toFixed(1),
  length: 80 + (i * 30),
  angle: 25 + i * 10,
  startFrame: 10 + i * 12,
}))

export const DisneyIntro = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Global fade-out near the end
  const globalOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.ease }
  )

  // Nebula glow behind logo
  const nebulaOpacity = interpolate(
    frame,
    [15, 45, durationInFrames - 25, durationInFrames - 10],
    [0, 0.85, 0.85, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const nebulaScale = interpolate(frame, [15, 55], [0.2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  // Logo entrance via spring
  const logoSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 20, stiffness: 65, mass: 1.3 },
  })
  const logoOpacity = interpolate(
    frame,
    [38, 58, durationInFrames - 22, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const logoGlow = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  })

  // "Disney+" text entrance
  const textOpacity = interpolate(frame, [65, 80, durationInFrames - 20, durationInFrames - 8], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const textY = interpolate(frame, [65, 82], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at center, #0a0f2e 0%, #040714 60%)',
        opacity: globalOpacity,
        overflow: 'hidden',
      }}
    >
      {/* Starfield */}
      {STARS.map((star, i) => {
        const appear = interpolate(
          frame,
          [star.delay, star.delay + 14],
          [0, parseFloat(star.baseOpacity)],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        // Subtle twinkle
        const twinkle =
          Math.sin((frame / star.twinkleSpeed) * Math.PI + i) * 0.18 + 0.82

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              background: 'white',
              opacity: appear * twinkle,
              boxShadow: `0 0 ${parseFloat(star.size) + 1}px rgba(255,255,255,0.6)`,
            }}
          />
        )
      })}

      {/* Shooting stars */}
      {SHOOTERS.map((s, i) => {
        const progress = interpolate(
          frame,
          [s.startFrame, s.startFrame + 18],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        const tailOpacity = interpolate(
          frame,
          [s.startFrame, s.startFrame + 6, s.startFrame + 18],
          [0, 0.9, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        const dx = Math.cos((s.angle * Math.PI) / 180) * s.length * progress
        const dy = Math.sin((s.angle * Math.PI) / 180) * s.length * progress

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${parseFloat(s.startX) + (dx / 19.2)}%`,
              top: `${parseFloat(s.startY) + (dy / 10.8)}%`,
              width: `${s.length * 0.4}px`,
              height: '1px',
              background:
                'linear-gradient(to right, transparent, rgba(255,255,255,0.9))',
              opacity: tailOpacity,
              transform: `rotate(${s.angle}deg)`,
              transformOrigin: 'right center',
            }}
          />
        )
      })}

      {/* Central nebula glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(17,60,207,0.55) 0%, rgba(83,36,222,0.28) 40%, transparent 70%)',
          opacity: nebulaOpacity,
          transform: `translate(-50%, -50%) scale(${nebulaScale})`,
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }}
      />

      {/* Secondary purple ring */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '900px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(120,36,200,0.18) 0%, transparent 65%)',
          opacity: nebulaOpacity * 0.7,
          transform: `translate(-50%, -50%) scale(${nebulaScale * 0.8})`,
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Disney+ Logo */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <img
          src="/images/logo.svg"
          alt="Disney+"
          style={{
            width: '260px',
            opacity: logoOpacity,
            transform: `scale(${logoSpring})`,
            filter: `drop-shadow(0 0 ${20 + logoGlow * 20}px rgba(17,60,207,${0.4 + logoGlow * 0.5})) drop-shadow(0 0 ${40 + logoGlow * 30}px rgba(17,60,207,${0.2 + logoGlow * 0.3}))`,
          }}
        />

        <p
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            color: 'rgba(249,249,249,0.65)',
            fontSize: '14px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: "'Nunito Sans', sans-serif",
            fontWeight: 600,
          }}
        >
          Stream Everything
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
