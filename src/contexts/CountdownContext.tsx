import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { ChallengesContext } from './ChallengesContext'

interface CountdownContextData {
  minutes: number
  seconds: number
  time: number
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownContextProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownContextProps) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const twentyFiveMinutes = 0.1 * 60
  
  const [time, setTime] = useState(twentyFiveMinutes)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(twentyFiveMinutes)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time => time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  const contextValues = {
    minutes,
    seconds,
    time,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  }

  return (
    <CountdownContext.Provider value={contextValues}>
      {children}
    </CountdownContext.Provider>
  )
}
