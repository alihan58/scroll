'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, RotateCcw, Trophy, Sparkles, Play, Pause, Bot, User, Zap, AlertTriangle, Shield, Snowflake, Maximize2, Minimize2 } from 'lucide-react'
import { chiptuneEngine } from '@/lib/audio8bit'

type Difficulty = 'easy' | 'medium' | 'hard'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  alpha: number
}

interface Ball {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

interface Orb {
  id: number
  x: number
  y: number
  vy: number
  kind: 'reward' | 'penalty'
  type: 'enlarge' | 'shrink' | 'shield' | 'freeze_player' | 'freeze_cpu' | 'multiball'
  color: string
  label: string
}

export default function InteractiveAudioVisualizer() {
  const [isPlayingBgm, setIsPlayingBgm] = useState(false)
  const [gameState, setGameState] = useState<'difficulty_select' | 'playing' | 'gameover' | 'victory'>('difficulty_select')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  
  const [playerScore, setPlayerScore] = useState(0)
  const [cpuScore, setCpuScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [activeOrbText, setActiveOrbText] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number | null>(null)

  // Game object references
  const playerPaddleRef = useRef({ x: 250, width: 95, baseWidth: 95, height: 16 })
  const cpuPaddleRef = useRef({ x: 250, width: 95, baseWidth: 95, height: 16 })
  const ballsRef = useRef<Ball[]>([])
  const orbsRef = useRef<Orb[]>([])
  const particlesRef = useRef<Particle[]>([])
  
  const playerShieldRef = useRef(false)
  const cpuShieldRef = useRef(false)
  const isPlayerFrozenRef = useRef(false)
  const isCpuFrozenRef = useRef(false)

  const playerTimerRef = useRef<any>(null)
  const cpuTimerRef = useRef<any>(null)
  const hitCountRef = useRef(0)

  const playerScoreRef = useRef(0)
  const cpuScoreRef = useRef(0)
  const difficultyRef = useRef<Difficulty>('medium')

  // 8-Bit Web Audio SFX Synthesizer
  const play8BitSfx = useCallback((type: 'paddle' | 'score' | 'win' | 'lose' | 'powerup' | 'freeze' | 'penalty') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      if (type === 'paddle') {
        osc.type = 'square'
        osc.frequency.setValueAtTime(440, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08)
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      } else if (type === 'freeze') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.25)
        gain.gain.setValueAtTime(0.16, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
      } else if (type === 'penalty') {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(300, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.25)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
      } else if (type === 'powerup') {
        const freqs = [523.25, 659.25, 783.99, 1046.50]
        freqs.forEach((freq, idx) => {
          const pOsc = ctx.createOscillator()
          const pGain = ctx.createGain()
          pOsc.type = 'square'
          pOsc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06)
          pGain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.06)
          pGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.08)
          pOsc.connect(pGain)
          pGain.connect(ctx.destination)
          pOsc.start(ctx.currentTime + idx * 0.06)
          pOsc.stop(ctx.currentTime + idx * 0.06 + 0.08)
        })
        return
      } else if (type === 'score') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(523.25, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      } else if (type === 'win') {
        const notes = [523.25, 659.25, 783.99, 1046.50]
        notes.forEach((freq, idx) => {
          const winOsc = ctx.createOscillator()
          const winGain = ctx.createGain()
          winOsc.type = 'square'
          winOsc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08)
          winGain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08)
          winGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.12)
          winOsc.connect(winGain)
          winGain.connect(ctx.destination)
          winOsc.start(ctx.currentTime + idx * 0.08)
          winOsc.stop(ctx.currentTime + idx * 0.08 + 0.12)
        })
        return
      } else {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(200, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.3)
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      }

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    } catch (e) {}
  }, [])

  // Toggle Background BGM
  const toggleBgm = () => {
    const state = chiptuneEngine.toggle()
    setIsPlayingBgm(state)
  }

  // Start match
  const startMatch = (selectedDiff: Difficulty) => {
    setDifficulty(selectedDiff)
    difficultyRef.current = selectedDiff
    setGameState('playing')

    playerScoreRef.current = 0
    cpuScoreRef.current = 0
    hitCountRef.current = 0
    setPlayerScore(0)
    setCpuScore(0)
    particlesRef.current = []
    orbsRef.current = []
    playerShieldRef.current = false
    cpuShieldRef.current = false
    isPlayerFrozenRef.current = false
    isCpuFrozenRef.current = false
    playerPaddleRef.current.width = playerPaddleRef.current.baseWidth
    cpuPaddleRef.current.width = cpuPaddleRef.current.baseWidth
    setActiveOrbText(null)

    resetBallToPlayer()
  }

  // Serve Ball SLOWLY towards Player's exact paddle position!
  const resetBallToPlayer = () => {
    const canvas = canvasRef.current
    const w = canvas ? canvas.width : 600
    const h = canvas ? canvas.height : 400

    const slowServeSpeedY = 2.8
    const playerX = playerPaddleRef.current.x + playerPaddleRef.current.width / 2

    ballsRef.current = [{
      id: Math.random(),
      x: playerX,
      y: h * 0.3,
      vx: (Math.random() - 0.5) * 1.5,
      vy: slowServeSpeedY,
      radius: 15,
      color: '#10b981',
    }]
  }

  // Spawn Rewards & Penalties (Falling towards Player or CPU!)
  const spawnDualOrb = (x: number, y: number, isPlayerHit: boolean) => {
    hitCountRef.current += 1
    const isReward = Math.random() > 0.45 // Rewards & Penalties mix!

    // Falling direction: towards Player (+vy) or towards CPU (-vy)
    const vy = isPlayerHit ? 1.8 : -1.8

    let selectedType: Orb['type']
    let color: string
    let label: string
    let kind: 'reward' | 'penalty'

    if (isReward) {
      kind = 'reward'
      const rewards: Orb['type'][] = ['enlarge', 'shield', 'freeze_cpu', 'multiball']
      selectedType = rewards[Math.floor(Math.random() * rewards.length)]

      const cfg = {
        enlarge: { color: '#34d399', label: '🟢 RAKET BÜYÜTÜCÜ' },
        shield: { color: '#00f0ff', label: '🛡️ KORUMA KALKANI' },
        freeze_cpu: { color: '#38bdf8', label: '❄️ RAKİBİ DONDUR' },
        multiball: { color: '#ff007f', label: '💥 ÇOKLU UZAYLI' },
      }[selectedType as 'enlarge' | 'shield' | 'freeze_cpu' | 'multiball']

      color = cfg.color
      label = cfg.label
    } else {
      kind = 'penalty'
      const penalties: Orb['type'][] = ['shrink', 'freeze_player']
      selectedType = penalties[Math.floor(Math.random() * penalties.length)]

      const cfg = {
        shrink: { color: '#ef4444', label: '🔴 CEZA: RAKET KÜÇÜLDÜ!' },
        freeze_player: { color: '#f59e0b', label: '⚡ CEZA: DONDUNUZ!' },
      }[selectedType as 'shrink' | 'freeze_player']

      color = cfg.color
      label = cfg.label
    }

    orbsRef.current.push({
      id: Math.random(),
      x,
      y,
      vy,
      kind,
      type: selectedType,
      color,
      label,
    })
  }

  // Apply Orb effect to Target (Player or CPU)
  const applyOrbEffect = (orb: Orb, isTargetPlayer: boolean) => {
    if (orb.kind === 'penalty') {
      play8BitSfx('penalty')
    } else {
      play8BitSfx('powerup')
    }

    setActiveOrbText(`${isTargetPlayer ? 'OYUNCU: ' : 'BİLGİSAYAR: '} ${orb.label}`)
    setTimeout(() => setActiveOrbText(null), 3000)

    if (orb.type === 'enlarge') {
      if (isTargetPlayer) {
        playerPaddleRef.current.width = playerPaddleRef.current.baseWidth * 1.65
        setTimeout(() => playerPaddleRef.current.width = playerPaddleRef.current.baseWidth, 7000)
      } else {
        cpuPaddleRef.current.width = cpuPaddleRef.current.baseWidth * 1.65
        setTimeout(() => cpuPaddleRef.current.width = cpuPaddleRef.current.baseWidth, 7000)
      }
    } else if (orb.type === 'shrink') {
      if (isTargetPlayer) {
        playerPaddleRef.current.width = playerPaddleRef.current.baseWidth * 0.55
        setTimeout(() => playerPaddleRef.current.width = playerPaddleRef.current.baseWidth, 6000)
      } else {
        cpuPaddleRef.current.width = cpuPaddleRef.current.baseWidth * 0.55
        setTimeout(() => cpuPaddleRef.current.width = cpuPaddleRef.current.baseWidth, 6000)
      }
    } else if (orb.type === 'shield') {
      if (isTargetPlayer) {
        playerShieldRef.current = true
        setTimeout(() => playerShieldRef.current = false, 8000)
      } else {
        cpuShieldRef.current = true
        setTimeout(() => cpuShieldRef.current = false, 8000)
      }
    } else if (orb.type === 'freeze_cpu') {
      play8BitSfx('freeze')
      isCpuFrozenRef.current = true
      setTimeout(() => isCpuFrozenRef.current = false, 5500)
    } else if (orb.type === 'freeze_player') {
      play8BitSfx('freeze')
      isPlayerFrozenRef.current = true
      setTimeout(() => isPlayerFrozenRef.current = false, 4500)
    } else if (orb.type === 'multiball') {
      const canvas = canvasRef.current
      const w = canvas ? canvas.width : 600
      const h = canvas ? canvas.height : 400
      ballsRef.current.push({
        id: Math.random(),
        x: w / 2,
        y: h / 2,
        vx: (Math.random() - 0.5) * 5,
        vy: isTargetPlayer ? 3.5 : -3.5,
        radius: 15,
        color: '#ff007f',
      })
    }
  }

  // Controller
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPlayerFrozenRef.current) return // Frozen player cannot move!
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width)
    playerPaddleRef.current.x = Math.max(0, Math.min(canvas.width - playerPaddleRef.current.width, mouseX - playerPaddleRef.current.width / 2))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isPlayerFrozenRef.current) return
    const canvas = canvasRef.current
    if (!canvas || !e.touches[0]) return
    const rect = canvas.getBoundingClientRect()
    const touchX = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width)
    playerPaddleRef.current.x = Math.max(0, Math.min(canvas.width - playerPaddleRef.current.width, touchX - playerPaddleRef.current.width / 2))
  }

  // Main Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const spawnParticles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 4 + 1
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
        })
      }
    }

    const drawAlienHead = (x: number, y: number, radius: number) => {
      ctx.save()
      ctx.translate(x, y)

      ctx.shadowColor = '#10b981'
      ctx.shadowBlur = 18

      ctx.fillStyle = '#10b981'
      ctx.beginPath()
      ctx.ellipse(0, -2, radius * 1.1, radius * 1.3, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.strokeStyle = '#34d399'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(-radius * 0.5, -radius * 0.9)
      ctx.lineTo(-radius * 0.9, -radius * 1.5)
      ctx.moveTo(radius * 0.5, -radius * 0.9)
      ctx.lineTo(radius * 0.9, -radius * 1.5)
      ctx.stroke()

      ctx.fillStyle = '#00f0ff'
      ctx.beginPath()
      ctx.arc(-radius * 0.9, -radius * 1.5, 3, 0, Math.PI * 2)
      ctx.arc(radius * 0.9, -radius * 1.5, 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#08080c'
      ctx.beginPath()
      ctx.ellipse(-radius * 0.45, -radius * 0.2, radius * 0.4, radius * 0.55, Math.PI / 8, 0, Math.PI * 2)
      ctx.ellipse(radius * 0.45, -radius * 0.2, radius * 0.4, radius * 0.55, -Math.PI / 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#00f0ff'
      ctx.beginPath()
      ctx.arc(-radius * 0.35, -radius * 0.35, 2, 0, Math.PI * 2)
      ctx.arc(radius * 0.35, -radius * 0.35, 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const loop = () => {
      const width = canvas.width
      const height = canvas.height

      ctx.fillStyle = '#08080c'
      ctx.fillRect(0, 0, width, height)

      // Center line
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)'
      ctx.setLineDash([8, 8])
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      ctx.lineTo(width, height / 2)
      ctx.stroke()
      ctx.setLineDash([])

      if (gameState === 'playing') {
        const playerPaddle = playerPaddleRef.current
        const cpuPaddle = cpuPaddleRef.current
        
        const playerY = height - 35
        const cpuY = 25

        // 1. Move AI Computer Paddle (If NOT frozen!)
        if (!isCpuFrozenRef.current) {
          const mainBall = ballsRef.current[0]
          if (mainBall) {
            const cpuCenter = cpuPaddle.x + cpuPaddle.width / 2
            let aiSpeed = 2.8
            if (difficultyRef.current === 'easy') aiSpeed = 2.0
            if (difficultyRef.current === 'hard') aiSpeed = 4.5

            if (cpuCenter < mainBall.x - 10) {
              cpuPaddle.x += aiSpeed
            } else if (cpuCenter > mainBall.x + 10) {
              cpuPaddle.x -= aiSpeed
            }
            cpuPaddle.x = Math.max(0, Math.min(width - cpuPaddle.width, cpuPaddle.x))
          }
        }

        // 2. Render & Update Falling/Rising Orbs (Dual Rewards & Penalties!)
        for (let pw = orbsRef.current.length - 1; pw >= 0; pw--) {
          const orb = orbsRef.current[pw]
          orb.y += orb.vy

          // Draw Orb
          ctx.fillStyle = orb.color
          ctx.shadowColor = orb.color
          ctx.shadowBlur = 16
          ctx.beginPath()
          ctx.arc(orb.x, orb.y, 14, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          ctx.font = 'bold 10px font-mono, sans-serif'
          ctx.fillStyle = '#000000'
          ctx.textAlign = 'center'
          ctx.fillText(orb.kind === 'penalty' ? '🔴' : '🟢', orb.x, orb.y + 4)

          // Catch by Player Paddle (Bottom)
          if (
            orb.y + 14 >= playerY &&
            orb.y - 14 <= playerY + playerPaddle.height &&
            orb.x >= playerPaddle.x - 10 &&
            orb.x <= playerPaddle.x + playerPaddle.width + 10 &&
            orb.vy > 0
          ) {
            applyOrbEffect(orb, true)
            spawnParticles(orb.x, orb.y, orb.color)
            orbsRef.current.splice(pw, 1)
            continue
          }

          // Catch by CPU Paddle (Top)
          if (
            orb.y - 14 <= cpuY + cpuPaddle.height &&
            orb.y + 14 >= cpuY &&
            orb.x >= cpuPaddle.x - 10 &&
            orb.x <= cpuPaddle.x + cpuPaddle.width + 10 &&
            orb.vy < 0
          ) {
            applyOrbEffect(orb, false)
            spawnParticles(orb.x, orb.y, orb.color)
            orbsRef.current.splice(pw, 1)
            continue
          }

          if (orb.y > height + 20 || orb.y < -20) {
            orbsRef.current.splice(pw, 1)
          }
        }

        // 3. Render & Update Balls
        for (let b = ballsRef.current.length - 1; b >= 0; b--) {
          const ball = ballsRef.current[b]
          ball.x += ball.vx
          ball.y += ball.vy

          // Slime trail
          if (Math.random() > 0.4) {
            particlesRef.current.push({
              x: ball.x,
              y: ball.y,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() - 0.5) * 1.5,
              color: '#10b981',
              alpha: 0.6,
            })
          }

          // Wall collisions
          if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= width) {
            ball.vx *= -1
            play8BitSfx('paddle')
          }

          // Collision with Player Paddle
          if (
            ball.y + ball.radius >= playerY &&
            ball.y - ball.radius <= playerY + playerPaddle.height &&
            ball.x >= playerPaddle.x &&
            ball.x <= playerPaddle.x + playerPaddle.width &&
            ball.vy > 0
          ) {
            ball.vy *= -1.02
            const hitPos = (ball.x - (playerPaddle.x + playerPaddle.width / 2)) / (playerPaddle.width / 2)
            ball.vx = hitPos * 5.2

            play8BitSfx('paddle')
            spawnParticles(ball.x, ball.y, '#00f0ff')
            
            // Spawn Dual Orbs (Towards Player or CPU!)
            spawnDualOrb(ball.x, ball.y - 25, true)
          }

          // Collision with Player Shield
          if (playerShieldRef.current && ball.y + ball.radius >= height - 10 && ball.vy > 0) {
            ball.vy *= -1
            play8BitSfx('paddle')
            spawnParticles(ball.x, height - 10, '#00f0ff')
          }

          // Collision with CPU Shield
          if (cpuShieldRef.current && ball.y - ball.radius <= 10 && ball.vy < 0) {
            ball.vy *= -1
            play8BitSfx('paddle')
            spawnParticles(ball.x, 10, '#ff007f')
          }

          // Collision with CPU Paddle
          if (
            ball.y - ball.radius <= cpuY + cpuPaddle.height &&
            ball.y + ball.radius >= cpuY &&
            ball.x >= cpuPaddle.x &&
            ball.x <= cpuPaddle.x + cpuPaddle.width &&
            ball.vy < 0
          ) {
            ball.vy *= -1.02
            const hitPos = (ball.x - (cpuPaddle.x + cpuPaddle.width / 2)) / (cpuPaddle.width / 2)
            ball.vx = hitPos * 5.2

            play8BitSfx('paddle')
            spawnParticles(ball.x, ball.y, '#ff007f')

            // CPU Hit spawns Orbs falling towards Player!
            spawnDualOrb(ball.x, ball.y + 25, false)
          }

          // Goal Checks
          if (ball.y - ball.radius <= 0 && !cpuShieldRef.current) {
            playerScoreRef.current += 1
            setPlayerScore(playerScoreRef.current)
            play8BitSfx('score')
            spawnParticles(ball.x, 20, '#00f0ff')

            if (playerScoreRef.current >= 10) {
              setGameState('victory')
              setHighScore((prev) => Math.max(prev, playerScoreRef.current))
              play8BitSfx('win')
            } else {
              ballsRef.current.splice(b, 1)
              if (ballsRef.current.length === 0) resetBallToPlayer()
            }
          } else if (ball.y + ball.radius >= height && !playerShieldRef.current) {
            cpuScoreRef.current += 1
            setCpuScore(cpuScoreRef.current)
            play8BitSfx('lose')
            spawnParticles(ball.x, height - 20, '#ff007f')

            if (cpuScoreRef.current >= 10) {
              setGameState('gameover')
              play8BitSfx('lose')
            } else {
              ballsRef.current.splice(b, 1)
              if (ballsRef.current.length === 0) resetBallToPlayer()
            }
          }

          // Draw 8-Bit Alien Head 👽
          drawAlienHead(ball.x, ball.y, ball.radius)
        }

        // Draw Player Shield
        if (playerShieldRef.current) {
          ctx.strokeStyle = '#00f0ff'
          ctx.lineWidth = 6
          ctx.shadowColor = '#00f0ff'
          ctx.shadowBlur = 20
          ctx.beginPath()
          ctx.moveTo(0, height - 6)
          ctx.lineTo(width, height - 6)
          ctx.stroke()
          ctx.shadowBlur = 0
        }

        // Draw CPU Shield
        if (cpuShieldRef.current) {
          ctx.strokeStyle = '#ff007f'
          ctx.lineWidth = 6
          ctx.shadowColor = '#ff007f'
          ctx.shadowBlur = 20
          ctx.beginPath()
          ctx.moveTo(0, 6)
          ctx.lineTo(width, 6)
          ctx.stroke()
          ctx.shadowBlur = 0
        }

        // Draw Player Paddle (Frozen Ice Block if player is frozen!)
        if (isPlayerFrozenRef.current) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.45)'
          ctx.strokeStyle = '#38bdf8'
          ctx.lineWidth = 2.5
          ctx.shadowColor = '#38bdf8'
          ctx.shadowBlur = 25
          ctx.beginPath()
          ctx.roundRect(playerPaddle.x - 6, playerY - 4, playerPaddle.width + 12, playerPaddle.height + 8, 8)
          ctx.fill()
          ctx.stroke()
          ctx.shadowBlur = 0

          ctx.font = 'bold 10px font-mono, sans-serif'
          ctx.fillStyle = '#ffffff'
          ctx.textAlign = 'center'
          ctx.fillText('⚡ DONDUNUZ ⚡', playerPaddle.x + playerPaddle.width / 2, playerY + 12)
        } else {
          const playerGrad = ctx.createLinearGradient(playerPaddle.x, 0, playerPaddle.x + playerPaddle.width, 0)
          playerGrad.addColorStop(0, '#00f0ff')
          playerGrad.addColorStop(1, '#7000ff')

          ctx.fillStyle = playerGrad
          ctx.shadowColor = '#00f0ff'
          ctx.shadowBlur = 15
          ctx.beginPath()
          ctx.roundRect(playerPaddle.x, playerY, playerPaddle.width, playerPaddle.height, 6)
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Draw CPU Paddle (Frozen Ice Block if CPU is frozen!)
        if (isCpuFrozenRef.current) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.45)'
          ctx.strokeStyle = '#38bdf8'
          ctx.lineWidth = 2.5
          ctx.shadowColor = '#38bdf8'
          ctx.shadowBlur = 25
          ctx.beginPath()
          ctx.roundRect(cpuPaddle.x - 6, cpuY - 4, cpuPaddle.width + 12, cpuPaddle.height + 8, 8)
          ctx.fill()
          ctx.stroke()
          ctx.shadowBlur = 0

          ctx.font = 'bold 10px font-mono, sans-serif'
          ctx.fillStyle = '#ffffff'
          ctx.textAlign = 'center'
          ctx.fillText('❄️ RAKİP DONDURULDU ❄️', cpuPaddle.x + cpuPaddle.width / 2, cpuY + 12)
        } else {
          const cpuGrad = ctx.createLinearGradient(cpuPaddle.x, 0, cpuPaddle.x + cpuPaddle.width, 0)
          cpuGrad.addColorStop(0, '#ff007f')
          cpuGrad.addColorStop(1, '#f59e0b')

          ctx.fillStyle = cpuGrad
          ctx.shadowColor = '#ff007f'
          ctx.shadowBlur = 15
          ctx.beginPath()
          ctx.roundRect(cpuPaddle.x, cpuY, cpuPaddle.width, cpuPaddle.height, 6)
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Render Particles
        for (let p = particlesRef.current.length - 1; p >= 0; p--) {
          const particle = particlesRef.current[p]
          particle.x += particle.vx
          particle.y += particle.vy
          particle.alpha -= 0.03

          if (particle.alpha <= 0) {
            particlesRef.current.splice(p, 1)
            continue
          }

          ctx.fillStyle = particle.color
          ctx.globalAlpha = particle.alpha
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1.0
        }

        // Draw Score HUD
        ctx.font = 'bold 16px "Press Start 2P", monospace, sans-serif'
        ctx.fillStyle = '#00f0ff'
        ctx.fillText(`OYUNCI: ${playerScoreRef.current}`, 30, height - 20)

        ctx.fillStyle = '#ff007f'
        ctx.fillText(`BİLGİSAYAR: ${cpuScoreRef.current}`, width - 240, 40)
      } else {
        // Background Spectrum Wave Animation
        const barCount = 48
        const barWidth = width / barCount - 3
        const time = Date.now() * 0.003

        for (let b = 0; b < barCount; b++) {
          const amplitude = Math.abs(Math.sin(time + b * 0.2) * Math.cos(time * 0.8 + b * 0.15)) * 0.7 + 0.3
          const barHeight = amplitude * (height * 0.4)
          const x = b * (barWidth + 3) + 1.5
          const y = (height - barHeight) / 2

          const grad = ctx.createLinearGradient(0, y, 0, y + barHeight)
          grad.addColorStop(0, '#00f0ff')
          grad.addColorStop(0.5, '#7000ff')
          grad.addColorStop(1, '#ff007f')

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.roundRect(x, y, barWidth, barHeight, 4)
          ctx.fill()
        }
      }

      gameLoopRef.current = requestAnimationFrame(loop)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
    }

    resize()
    window.addEventListener('resize', resize)
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current)
    }
  }, [gameState, play8BitSfx])

  return (
    <section id="visualizer" className="py-32 px-6 bg-[#08080c] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-card border border-emerald-500/30 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>⚡ ÇİFT YÖNLÜ ÖDÜL & CEZA ARCADIA PONG</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Ödüllü & Cezalı Pong <span className="text-gradient-cyan">VS Bilgisayar</span>
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleBgm}
              className={`px-5 py-3 rounded-full border text-xs font-mono transition-all flex items-center space-x-2 ${
                isPlayingBgm 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.3)] animate-pulse'
                  : 'glass-panel border-white/10 text-white/70 hover:border-cyan-400'
              }`}
            >
              {isPlayingBgm ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlayingBgm ? 'BGM DURDUR' : 'BGM ÇAL'}</span>
            </button>

            {gameState !== 'difficulty_select' && (
              <button
                onClick={() => setGameState('difficulty_select')}
                className="px-5 py-3 rounded-full glass-card text-white font-mono text-xs hover:border-cyan-400 transition-all flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>SEVİYE DEĞİŞTİR</span>
              </button>
            )}
          </div>
        </div>

        {/* Arcade Oyun Canvas Kartı */}
        <div className="relative rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl mb-8">
          
          {/* Top Arcade HUD Stats */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 text-xs font-mono text-white/60 bg-black/40 backdrop-blur-md">
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-2 text-cyan-400 font-bold">
                <User className="w-4 h-4" />
                <span>OYUNCI: {playerScore}</span>
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center space-x-2 text-pink-400 font-bold">
                <Bot className="w-4 h-4" />
                <span>BİLGİSAYAR: {cpuScore}</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {activeOrbText && (
                <span className="px-3 py-1 rounded-full glass-card text-[10px] font-bold uppercase text-cyan-300 border border-cyan-400/40 animate-pulse">
                  {activeOrbText}
                </span>
              )}
              <span className="px-3 py-1 rounded-full glass-card text-[10px] font-bold uppercase text-emerald-400 border border-emerald-500/30">
                👽 UZAYLI MODU ({difficulty.toUpperCase()})
              </span>
            </div>
          </div>

          {/* Main Arcade Canvas */}
          <div className="relative w-full h-80 sm:h-[420px]">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="w-full h-full cursor-crosshair touch-none"
            />

            {/* Difficulty Select Menu */}
            {gameState === 'difficulty_select' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6 text-center z-20">
                <div className="text-5xl mb-3 animate-bounce">👽</div>
                <h3 className="text-2xl sm:text-4xl font-black text-white mb-2 tracking-tight">
                  Çift Yönlü Ödül & Ceza Pong
                </h3>
                <p className="text-white/60 text-sm max-w-md mb-8 font-light">
                  Hem size hem rakibe <span className="text-emerald-400 font-bold">🟢 Ödüller</span> ve <span className="text-rose-400 font-bold">🔴 Cezalar</span> düşer! Orbları yakalayan avantajı kapar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-lg w-full">
                  <button
                    onClick={() => startMatch('easy')}
                    className="flex-1 py-4 px-6 rounded-2xl glass-card border border-emerald-500/40 text-emerald-400 font-bold text-xs font-mono uppercase tracking-wider hover:bg-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>🟢 KOLAY</span>
                  </button>

                  <button
                    onClick={() => startMatch('medium')}
                    className="flex-1 py-4 px-6 rounded-2xl glass-card border border-amber-500/40 text-amber-400 font-bold text-xs font-mono uppercase tracking-wider hover:bg-amber-500/20 hover:scale-105 transition-all flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>🟡 ORTA</span>
                  </button>

                  <button
                    onClick={() => startMatch('hard')}
                    className="flex-1 py-4 px-6 rounded-2xl glass-card border border-rose-500/40 text-rose-400 font-bold text-xs font-mono uppercase tracking-wider hover:bg-rose-500/20 hover:scale-105 transition-all flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>🔴 ZOR</span>
                  </button>
                </div>
              </div>
            )}

            {/* Victory Screen */}
            {gameState === 'victory' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 text-center z-20">
                <Trophy className="w-16 h-16 text-yellow-400 mb-4 animate-bounce filter drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
                <h3 className="text-3xl sm:text-5xl font-black text-cyan-400 mb-2 tracking-tight">
                  TEBRİKLER! BİLGİSAYARI YENDİNİZ!
                </h3>
                <p className="text-white/80 font-mono text-base mb-8">
                  BİLGİSAYARI <span className="text-yellow-400 font-bold">{playerScore} - {cpuScore}</span> SKORLA MAĞLUP ETTİNİZ!
                </p>

                <button
                  onClick={() => setGameState('difficulty_select')}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold text-xs font-mono uppercase tracking-wider hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all"
                >
                  TEKRAR OYNA / SEVİYE SEÇ
                </button>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 text-center z-20">
                <div className="text-5xl mb-3">👽</div>
                <h3 className="text-3xl sm:text-5xl font-black text-pink-500 mb-2 tracking-tight">
                  BİLGİSAYAR KAZANDI!
                </h3>
                <p className="text-white/80 font-mono text-base mb-8">
                  SKOR: <span className="text-pink-400 font-bold">{cpuScore} - {playerScore}</span>
                </p>

                <button
                  onClick={() => setGameState('difficulty_select')}
                  className="px-8 py-4 rounded-full bg-cyan-400 text-black font-bold text-xs font-mono uppercase tracking-wider hover:bg-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all"
                >
                  YENİDEN DENE
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Power-Up & Penalty Info Footer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs text-white/50">
          <div className="p-3 rounded-xl glass-card border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block">🟢 ÖDÜL: BÜYÜTÜCÜ</span>
            <span className="text-[10px]">Yakalayanın Raketini Büyütür</span>
          </div>
          <div className="p-3 rounded-xl glass-card border border-rose-500/30">
            <span className="text-rose-400 font-bold block">🔴 CEZA: KÜÇÜLTÜCÜ</span>
            <span className="text-[10px]">Yakalayanın Raketini Küçültür</span>
          </div>
          <div className="p-3 rounded-xl glass-card border border-sky-500/30">
            <span className="text-sky-400 font-bold block">❄️ ÖDÜL/CEZA: BUZ KİLİDİ</span>
            <span className="text-[10px]">Rakibi Veya Sizi Dondurabilir</span>
          </div>
          <div className="p-3 rounded-xl glass-card border border-cyan-500/30">
            <span className="text-cyan-300 font-bold block">🛡️ ÖDÜL: KALKAN</span>
            <span className="text-[10px]">Sayı Düşmesini Engeller</span>
          </div>
        </div>

      </div>
    </section>
  )
}
