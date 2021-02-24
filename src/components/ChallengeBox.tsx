import { useState } from 'react'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const [hasActiveChallenge, setHasActiveChallenge] = useState(true)
  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeBoxActive}>
          <header>Ganhe 400xp</header>

          <main>
            <img src="icons/body.svg" alt="Body" />
            <strong>Novo desafio</strong>
            <p>Levante e faça uma caminhada de três minutos</p>
          </main>

          <footer>
            <button type="button" className={styles.challengeFailedButton}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
              Ganhei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeBoxNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}
