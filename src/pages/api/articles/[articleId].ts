import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { articleId } = req.query
  if (typeof articleId !== 'string') {
    return res.status(400).send('')
  }
  const id = parseInt(articleId)

  if (req.method === 'GET') {
    const article = await prisma.article.findUnique({
      where: { id },
    })
    res.json(article)
  } else if (req.method === 'PATCH') {
    const { body, title, description, published } = req.body
    const article = await prisma.article.update({
      where: { id },
      data: { body, title, description, published },
    })
    res.json(article)
  } else if (req.method === 'DELETE') {
    const article = await prisma.article.delete({ where: { id } })
    res.json(article)
  }
}
