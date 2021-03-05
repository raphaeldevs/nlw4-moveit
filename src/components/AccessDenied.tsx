import { useEffect } from 'react'

import Router from 'next/router'

import Cookies from 'js-cookie'

import { Loading } from './Loading'

export function AccessDenied() {
  useEffect(() => { 
    const hasToken = Boolean(Cookies.get('token'))

    if(!hasToken) Router.push('/')
  }, [])
  
  return <Loading />
}