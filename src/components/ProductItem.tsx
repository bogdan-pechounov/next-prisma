import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Product } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type ProductItemProps = {
  product: Product
}

function ProductItem({ product }: ProductItemProps) {
  const router = useRouter()

  return (
    <Card>
      <Link href={'/product/' + product.id}>
        <CardMedia
          image={product.imgUrl}
          sx={{ maxHeight: 300, objectFit: 'contain' }}
          component='img'
        />
        <CardContent>
          <Typography variant='h6'>{product.title}</Typography>
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
