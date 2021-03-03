import axios from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'

import { MongoClient, Db } from 'mongodb'

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, MONGODB_URI } = process.env

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

  const database = await connectToDatabase(MONGODB_URI)

  const collection = database.collection('users')

  const access_token = await getUserAccessToken(String(code))

  const user = await getUserData(access_token)

  const userAlreadyExists = await collection.findOne(user)

  if (!userAlreadyExists) {
    await collection.insertOne(user)
  }

  return response.json({ user: userAlreadyExists ? "exits" : "no exists" })
}
