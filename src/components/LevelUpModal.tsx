import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext)
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div>
          <header>{level}</header>

          <strong>Parabéns!</strong>
          <p>Você alcançou um novo level.</p>

          <button title="Fechar" className={styles.close} type="button" onClick={closeLevelUpModal}>
            <img src="icons/close.svg" alt="Fechar modal" />
          </button>
        </div>

        <button type="button" className={styles.twitter}>
          Compartilhar no Twitter 
          <img src="icons/twitter.svg" alt="Twitter"/>
        </button>
      </div>
    </div>
  )
}
