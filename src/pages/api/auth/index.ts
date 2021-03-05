import axios from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'

import { MongoClient, Db } from 'mongodb'

import jwt from 'jsonwebtoken'

import Cookies from 'cookies'

const { 
  APP_SECRET,
  GITHUB_CLIENT_ID, 
  GITHUB_CLIENT_SECRET, 
  MONGODB_URI
} = process.env

interface UserData {
  avatar_url: string
  name: string
  username: string
}

let cachedDatabase: Db

async function connectToDatabase(uri: string) {
  if (cachedDatabase) return cachedDatabase

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const databaseName = new URL(uri).pathname.substr(1)

  const database = client.db(databaseName)

  cachedDatabase = database

  return database
}

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

async function getUserData(access_token: string): Promise<UserData> {
  const { data: user } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`
    }
  })
  
  const { 
    avatar_url,
    name,
    login: username
  } = user

  return { 
    avatar_url,
    name,
    username
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { code } = request.query

  const cookies = new Cookies(request, response)

  const database = await connectToDatabase(MONGODB_URI)
  const collection = database.collection('users')

  const access_token = await getUserAccessToken(String(code))

  const userData = await getUserData(access_token)

  const user = await collection.findOne(userData)

  if (!user) {
    const { insertedId } = await collection.insertOne(userData)

    const userToken = jwt.sign(
      { id: insertedId, username: userData.username },
      APP_SECRET,
      { expiresIn: '30d' }
    )
  
    cookies.set('token', userToken, { httpOnly: false })
  
    return response.redirect('/').end()
  }

  const userToken = jwt.sign(
    { id: user._id, username: user.username },
    APP_SECRET,
    { expiresIn: '30d' }
  )

  cookies.set('token', userToken, { httpOnly: false })

  return response.redirect('/app').end()
}
