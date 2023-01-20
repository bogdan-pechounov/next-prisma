import ProductItem from '@/components/ProductItem'
import prisma from '@/lib/prisma'
import { Grid } from '@mui/material'
import { Product } from '@prisma/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'

type Props = {
  products: Product[]
}

export default function Home({ products }: Props) {
  return (
    <Grid container spacing={1}>
      {products.map((product) => (
        <Grid key={product.id} item xs={3}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const products = await prisma.product.findMany()
  return {
    props: {
      products,
    },
    revalidate: 100,
  }
}
