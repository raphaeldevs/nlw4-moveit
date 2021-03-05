import { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { signOut } = useContext(AuthContext)
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/raphaeldevs.png" alt="Raphael Corrêa" />
      <div>
        <strong>Raphael Corrêa</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>

      <button onClick={signOut} title="Sair">
        <img src="icons/close.svg" alt="Close"/>
      </button>
    </div>
  )
}
