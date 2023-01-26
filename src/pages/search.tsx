import ProductItem from '@/components/ProductItem'
import prisma from '@/lib/prisma'
import { parseQueryInt, parseQueryString } from '@/lib/utils'
import { Container, Grid, Pagination, PaginationItem } from '@mui/material'
import { Box } from '@mui/system'
import { Product } from '@prisma/client'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NUM_ITEMS_PER_PAGE = 15

type Props = {
  products: Product[]
  numPages: number
}

export default function Search({ products, numPages }: Props) {
  const { pathname, query } = useRouter()
  const page = parseQueryInt(query.page, 1)
  return (
    <Container>
      <Grid container spacing={2} style={{ justifyContent: 'center' }}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
      <Box mt={2} display={'flex'} justifyContent={'center'}>
        <Pagination
          count={numPages}
          page={page}
          renderItem={(item) => (
            <Link href={{ pathname, query: { ...query, page: item.page } }}>
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
  const search = parseQueryString(context.query.q)
    ?.split(' ')
    .filter((i) => i) //empty strings are falsy and will be filtered out so you don't get "word1 " => "word1 & "
    .join(' & ') // "word1 word2" becomes "word1 & word2" which respects postgresql syntax
  const brand = parseQueryString(context.query.brand)

  const numPages = Math.ceil(
    (await prisma.product.count({
      where: {
        title: { search },
        brand,
      },
    })) / NUM_ITEMS_PER_PAGE
  )

  const products = await prisma.product.findMany({
    skip,
    take: NUM_ITEMS_PER_PAGE,
    where: {
      title: {
        search,
      },
      brand,
    },
  })
  return {
    props: {
      products,
      numPages,
    },
  }
}
