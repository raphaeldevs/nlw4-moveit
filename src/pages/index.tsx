import { ExperinceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <ExperinceBar />

      <section>
        <div>
          <Profile />
        </div>
      </section>
    </div>
  )
}
