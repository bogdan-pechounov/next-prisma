import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Product } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '@/styles/Product.module.css'
import Image from 'next/image'

type ProductItemProps = {
  product: Product
}

function ProductItem({ product }: ProductItemProps) {
  const router = useRouter()

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
            // priority
          />
        </Box>
        <CardContent>
          <Typography variant='h6' className={styles['max-lines']}>
            {product.title}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default ProductItem
