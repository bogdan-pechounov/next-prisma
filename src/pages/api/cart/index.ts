import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(401).send('Not logged in')
  if (req.method === 'POST') {
    const { product }: { product: Product } = req.body
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: session.user.id,
        productId: product.id,
      },
    })
    res.status(200).json(cartItem)
  } else if (req.method === 'GET') {
    const cart = await prisma.cartItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: { product: true },
    })
    res.status(200).json(cart)
  }
}
