import Link from 'next/link'

import { useRouter } from 'next/router'

import styles from '../styles/components/AsideBar.module.css'

interface NavLinkProps {
  href: string
  icon: string
}

function NavLink({ href, icon }: NavLinkProps) {
  const { pathname } = useRouter()

  const isSelected = href === pathname

  const [iconName] = icon.match(/[a-z]+(?=\.)/)
  const iconSelected = icon.replace(iconName, `${iconName}-selected`)

  return (
    <li className={isSelected && styles.selected}>
      <Link href={`${href}`}>
        <a>
          {isSelected
            ? <img src={`${iconSelected}`} alt="Home" />
            : <img src={`${icon}`} alt="Home" /> }
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
          <NavLink href="/" icon="/icons/home.svg" />

          <NavLink href="/ranking" icon="/icons/ranking.svg" />
        </ul>
      </nav>
    </aside>
  )
}
