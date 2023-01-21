import ProductItem from '@/components/ProductItem'
import prisma from '@/lib/prisma'
import { parseQueryInt } from '@/lib/utils'
import { Container, Grid, Pagination, PaginationItem } from '@mui/material'
import { Box } from '@mui/system'
import { Product } from '@prisma/client'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

const NUM_ITEMS_PER_PAGE = 15

type Props = {
  products: Product[]
  numPages: number
}

export default function Home({ products, numPages }: Props) {
  return (
    <Container>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
      <Box mt={2} display={'flex'} justifyContent={'center'}>
        <Pagination
          count={numPages}
          renderItem={(item) => (
            <Link href={`?page=${item.page}`}>
              <PaginationItem {...item} />
            </Link>
          )}
        />
      </Box>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page } = context.query
  const skip = (parseQueryInt(page, 1) - 1) * NUM_ITEMS_PER_PAGE
  const numPages = Math.ceil(
    (await prisma.product.count()) / NUM_ITEMS_PER_PAGE
  )
  const products = await prisma.product.findMany({
    skip,
    take: NUM_ITEMS_PER_PAGE,
  })
  return {
    props: {
      products,
      numPages,
    },
  }
}
