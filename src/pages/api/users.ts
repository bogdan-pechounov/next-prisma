import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body
      const user = await prisma.user.create({ data: { name } })
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  } else if (req.method === 'GET') {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  }
}
