import { useState, createContext, ReactNode } from 'react'

import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  activeChallenge: Challenge
  experienceToNextLevel: number
  startNewChallenge: () => void
  levelUp: () => void
  resetChallenge: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level => level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(
      Math.random() * challenges.length + 1
    )

    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  const contextValues = {
    level,
    levelUp,
    currentExperience,
    challengesCompleted,
    experienceToNextLevel,
    startNewChallenge,
    activeChallenge,
    resetChallenge
  }

  return (
    <ChallengesContext.Provider value={contextValues}>
      {children}
    </ChallengesContext.Provider>
  )
}
