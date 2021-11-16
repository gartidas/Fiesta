import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  if (method !== 'POST') {
    res.status(404).end()
  }

  const loginEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`

  try {
    const { data, headers: returnedHeaders } = await axios.post(loginEndpoint, body)
    Object.keys(returnedHeaders).forEach(key => res.setHeader(key, returnedHeaders[key]))
    res.status(200).json(data)
  } catch (e) {
    console.error(e)
    const response = e.response
    res.status(response?.status).json(response?.data)
  }
}
