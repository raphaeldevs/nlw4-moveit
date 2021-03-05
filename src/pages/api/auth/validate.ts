import { NextApiRequest, NextApiResponse } from 'next'

import jwt from 'jsonwebtoken'

export default async (request: NextApiRequest, response: NextApiResponse) => {  
  const { APP_SECRET } = process.env

  if (request.method === 'POST') {
    const { token } = request.cookies

    if (!token) return response.json({ isAuthenticated: false })

    const isValidToken = jwt.verify(token, APP_SECRET)

    return response.json({ isAuthenticated: Boolean(isValidToken) })
  }
}