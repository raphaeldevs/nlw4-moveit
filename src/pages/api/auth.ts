import axios from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

async function getUserAccessToken(code: string) {
  const { data: apiResponse } = await axios.post('https://github.com/login/oauth/access_token', {}, {
    headers: {
      Accept: 'application/json'
    },
    params: {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code
    }
  })

  const { access_token } = apiResponse

  return access_token
}

async function getUserData(access_token: string) {
  const { data: user } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`
    }
  })
  
  const { 
    avatar_url,
    name
  } = user

  return { 
    avatar_url,
    name
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { code } = request.query

  const access_token = await getUserAccessToken(String(code))

  const user = await getUserData(access_token)

  console.log(user)

  return response.json({ ok: true })
}
