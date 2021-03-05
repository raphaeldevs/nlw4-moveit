import {
  createContext,
  ReactNode,
  useEffect,
  useState
} from 'react'

import Cookies from 'js-cookie'

import axios from 'axios'

interface AuthContextData {
  isAuthenticated: boolean
  signOut: () => void
}

interface AuthContextProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  function signOut() {
    Cookies.remove('token')

    setIsAuthenticated(false)
  }

  useEffect(() => {
    (async () => {
      const { data: { isAuthenticated } } = await axios.post('/api/auth/validate')

      setIsAuthenticated(isAuthenticated)
    })()
  }, [])

  const contextValues = {
    isAuthenticated,
    signOut
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}