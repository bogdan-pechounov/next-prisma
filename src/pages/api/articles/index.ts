import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * @swagger
 * /api/articles:
 *   get:
 *     tags:
 *         - Articles
 *     description: Returns all published articles
 *     responses:
 *       200:
 *         description: published articles
 *   post:
 *     tags:
 *         - Articles
 *     description: Create an article
 *     produces:
 *      - application/json
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Article'
 *     responses:
 *      201:
 *        description: created article
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const articles = await prisma.article.findMany({
      where: { published: true },
    })
    res.status(200).json(articles)
  } else if (req.method === 'POST') {
    const { body, title, description, published } = req.body
    console.log(req.body)
    const article = await prisma.article.create({
      data: {
        body,
        title,
        description,
        published,
      },
    })
    res.status(201).json(article)
  }
}
