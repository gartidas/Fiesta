import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, headers } = req

  if (method !== 'GET') {
    res.status(404).end()
  }

  try {
    const { data, headers: returnedHeaders } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
      {
        headers: {
          accept: headers.accept,
          cookie: headers.cookie
        }
      }
    )
    Object.keys(returnedHeaders).forEach(key => res.setHeader(key, returnedHeaders[key]))
    res.status(200).json(data)
  } catch (e) {
    console.error(e.code)
    const response = e.response
    res.status(response?.status).json(response?.data)
  }
}
