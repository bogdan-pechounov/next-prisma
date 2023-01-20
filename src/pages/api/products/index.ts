import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * @swagger
 * /api/products:
 *  get:
 *    tags:
 *      - Products
 *    description: Returns all products
 *    responses:
 *       200:
 *         description: products
 *  post:
 *    tags:
 *      - Products
 *    description: Create a product
 *    produces:
 *      - application/json
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      201:
 *        description: created product
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany()
    res.status(200).json(products)
  } else if (req.method === 'POST') {
    const { title, description } = req.body
    const product = await prisma.product.create({
      data: {
        title,
        description,
        imgUrl: '', //todo
      },
    })
    res.status(201).json(product)
  }
}
