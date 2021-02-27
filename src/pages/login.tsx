import styles from '../styles/pages/Login.module.css'

export default function Login() {
  return (
    <div className={styles.container}>
      <form>
        <img src="logo-full-white.svg" alt="Logo do Move.it" />

        <h1>Bem-vindo</h1>
        <p>
          <img src="icons/github.svg" alt="Logo do GitHub" />
          Faça login com seu Github <br /> para começar
        </p>

        <fieldset>
          <input
            className={styles.inputSearch}
            type="text"
            placeholder="Digite seu username"
          />
          <input className={styles.inputSubmit} name="submit" type="submit" />
        </fieldset>
      </form>
    </div>
  )
}
