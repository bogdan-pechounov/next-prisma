import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  if (typeof id !== 'string') {
    return res.status(400).send('Incorrect type')
  }

  if (req.method === 'GET') {
    const article = await prisma.product.findUnique({
      where: { id },
    })
    res.json(article)
  } else if (req.method === 'PATCH') {
    const { title, description } = req.body
    const product = await prisma.product.update({
      where: { id },
      data: { title, description },
    })
    res.json(product)
  } else if (req.method === 'DELETE') {
    const product = await prisma.product.delete({ where: { id } })
    res.json(product)
  }
}
