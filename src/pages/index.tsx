import Head from 'next/head'

import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'

import styles from '../styles/pages/Login.module.css'

interface LoginProps {
  client_id: string
}

export default function Login({ client_id }: LoginProps) {
  const history = useRouter()

  const [canSubmit, setCanSubmit] = useState(false)
  const [username, setUsername] = useState('')

  function handleInputChange({ target: input }: ChangeEvent<HTMLInputElement>) {
    const { value: username } = input

    if (username.length) {
      setUsername(username)

      return setCanSubmit(true)
    }

    setCanSubmit(false)
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault()
    
    const urlLoginParams = new URLSearchParams({
      client_id,
      login: username,
      scope: 'user:email'
    }).toString()

    const loginUrl = 
      `https://github.com/login/oauth/authorize?${urlLoginParams}`

    history.push(loginUrl)
  }

  return (
    <>
      <Head>
        <title>Bem vindo ao move.it</title>
      </Head>

      <div className={styles.container}>
        <form onSubmit={handleFormSubmit}>
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
              name="username"
              placeholder="Digite seu username"
              onChange={handleInputChange}
              required
            />

            {canSubmit ? (
              <input
                className={`${styles.inputSubmit} ${styles.canSubmit}`}
                type="submit"
              />
            ) : (
              <input
                className={styles.inputSubmit}
                type="submit"
              />
            )}
          </fieldset>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { GITHUB_CLIENT_ID } = process.env

  console.log(context.req.headers)

  return {
    props: {
      client_id: GITHUB_CLIENT_ID
    }
  }
}