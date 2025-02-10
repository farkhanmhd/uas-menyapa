"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  expiryTime: string
}

export function CountdownTimer({ expiryTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const expiry = new Date(expiryTime).getTime()
      const difference = expiry - now

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        )
      } else {
        setTimeLeft("Expired")
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [expiryTime])

  return <div className="text-2xl font-bold text-red-600">{timeLeft}</div>
}

