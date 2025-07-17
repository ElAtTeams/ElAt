"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const particles = []
    const numParticles = 100
    const maxRadius = 3
    const minRadius = 0.5
    const maxSpeed = 0.5
    const minSpeed = 0.1

    function Particle(x, y, radius, color, speedX, speedY) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.speedX = speedX
      this.speedY = speedY

      this.draw = function () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      this.update = function () {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.speedX = -this.speedX
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.speedY = -this.speedY
        }

        this.draw()
      }
    }

    function init() {
      particles.length = 0
      for (let i = 0; i < numParticles; i++) {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius
        const x = Math.random() * (width - radius * 2) + radius
        const y = Math.random() * (height - radius * 2) + radius
        const color = `rgba(144, 238, 144, ${Math.random() * 0.5 + 0.2})` // Light green with varying opacity
        const speedXValue = (Math.random() - 0.5) * maxSpeed * 2
        const speedYValue = (Math.random() - 0.5) * maxSpeed * 2
        const speedX = speedXValue > 0 ? speedXValue + minSpeed : speedXValue - minSpeed
        const speedY = speedYValue > 0 ? speedYValue + minSpeed : speedYValue - minSpeed
        particles.push(new Particle(x, y, radius, color, speedX, speedY))
      }
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
      }
    }

    init()
    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      init()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}
