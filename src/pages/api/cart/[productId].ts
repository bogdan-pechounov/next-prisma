import prisma from '@/lib/prisma'
import { clamp, parseQueryInt, parseQueryString } from '@/lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(401).send('Not logged in')

  const productId = parseQueryString(req.query.productId)!
  if (req.method === 'DELETE') {
    //find cart item belonging to user
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    })
    await prisma.cartItem.delete({ where: { id: cartItem?.id } })
    res.status(200).send('Item deleted')
  } else if (req.method === 'PUT') {
    //restrict quantity between 1 and 20
    const quantity = clamp(req.body.quantity, 1, 20)
    //verify item belongs to user
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    })
    //update quantity
    await prisma.cartItem.update({
      where: { id: cartItem?.id },
      data: { quantity },
    })
    res.status(200).send('Item updated')
  }
}
