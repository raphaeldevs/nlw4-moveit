import Head from 'next/head'

import { useContext } from 'react'

import { AccessDenied } from '../components/AccessDenied'
import { AsideBar } from '../components/AsideBar'

import { AuthContext } from '../contexts/AuthContext'

import styles from '../styles/pages/Ranking.module.css'

export default function Ranking() {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) return <AccessDenied />

  return (
    <>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <div className={styles.wrapper}>
        <AsideBar />

        <div className={styles.container}>
          <h1>Leaderboard</h1>

          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Usuário</th>
                <th>Desafios</th>
                <th>Experiência</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <img
                    src="https://github.com/raphaeldevs.png"
                    alt="Raphael Corrêa"
                  />
                  <div>
                    <strong>Raphael Devs</strong>
                    <span>
                      <img src="/icons/level.svg" alt="Level" /> Level 19
                    </span>
                  </div>
                </td>
                <td>
                  <strong>127</strong> completados
                </td>
                <td>
                  <strong>108.000</strong> xp
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
