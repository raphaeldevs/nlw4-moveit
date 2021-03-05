import Link from 'next/link'

import { useRouter } from 'next/router'

import styles from '../styles/components/AsideBar.module.css'

interface NavLinkProps {
  href: string
  icon: string
  alt: string
}

function NavLink({ href, icon, alt }: NavLinkProps) {
  const { pathname } = useRouter()

  const isSelected = href === pathname

  const [iconName] = icon.match(/[a-z]+(?=\.)/)
  const iconSelected = icon.replace(iconName, `${iconName}-selected`)

  return (
    <li className={isSelected ? styles.selected : null}>
      <Link href={`${href}`}>
        <a>
          {isSelected
            ? <img src={`${iconSelected}`} alt={alt} />
            : <img src={`${icon}`} alt={alt} /> }
        </a>
      </Link>
    </li>
  )
}

export function AsideBar() {
  return (
    <aside className={styles.asideBar}>
      <img src="/logo.svg" alt="Logo do Move.it" />

      <nav className={styles.icons}>
        <ul>
          <NavLink href="/app" icon="/icons/home.svg" alt="Home" />

          <NavLink href="/ranking" icon="/icons/ranking.svg" alt="Ranking" />
        </ul>
      </nav>
    </aside>
  )
}
