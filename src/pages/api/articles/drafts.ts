import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const articles = await prisma.article.findMany({
      where: { published: false },
    })
    res.json(articles)
  }
}
