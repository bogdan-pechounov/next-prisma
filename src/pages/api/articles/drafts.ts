import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * @swagger
 * /api/articles/drafts:
 *  get:
 *    tags:
 *      - Articles
 *    description: Returns all draft articles
 *    responses:
 *      200:
 *        description: unpublished articles
 */
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
