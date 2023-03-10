import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Product } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import styles from '@/styles/Product.module.css'
import Image from 'next/image'

type ProductItemProps = {
  product: Product
}

function ProductItem({ product }: ProductItemProps) {
  return (
    <Card>
      <Link href={'/product/' + product.id}>
        <Box height={300} position='relative'>
          <Image
            src={product.imgUrl}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            blurDataURL={product.imgUrl}
            placeholder='blur'
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
            // todo why image resizes after load
          />
        </Box>
        <CardContent>
          <Typography variant='h6' className={styles['max-lines']}>
            {product.title}
          </Typography>
        </CardContent>
      </Link>
      <CardActions></CardActions>
    </Card>
  )
}

export default ProductItem
