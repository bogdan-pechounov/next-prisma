import LinearIndeterminate from '@/components/LinearIndeterminate'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { Box, Container, Stack } from '@mui/system'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import cartSlice from '@/lib/store/cartSlice'
import { useCart } from '@/lib/store/hooks'
import ProductRow from '@/components/ProductRow'
import Head from 'next/head'
import { formatPrice } from '@/lib/format'
import Link from 'next/link'

type ProductDetailsProps = {
  product: Product & {
    alsoBought: Product[]
    alsoViewed: Product[]
    boughtTogether: Product[]
    buyAfterViewing: Product[]
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { cart, add, remove } = useCart()

  //loading indicator
  if (router.isFallback) return <LinearIndeterminate />

  function AddToCart() {
    if (product.id in cart.items) {
      return (
        <Button variant='outlined' onClick={() => remove(product)}>
          Remove from cart
        </Button>
      )
    }
    return (
      <Button variant='outlined' onClick={() => add(product)}>
        Add to cart
      </Button>
    )
  }
  return (
    <Container>
      <Head>
        <title>{product.title}</title>
      </Head>
      <Stack direction={{ xs: 'column', sm: 'row' }} mb={3}>
        <Box flex='1 1 40%' position='relative' minHeight={300}>
          {/* Image */}
          <Image
            src={product.imgUrl}
            alt={product.title}
            fill
            style={{ objectFit: 'contain', padding: '10px' }}
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
          />
        </Box>
        <Box flex='1 1 60%'>
          {/* Details */}
          <Typography variant='h4'>{product.title}</Typography>
          <Typography variant='subtitle2'>
            <Link href={`/search?brand=${product.brand}`}>{product.brand}</Link>
          </Typography>
          <Typography variant='subtitle1' mb={2}>
            {formatPrice(product.price)}
          </Typography>
          <Typography variant='body1' mb={1}>
            {product.description}
          </Typography>
          <AddToCart />
        </Box>
      </Stack>
      {/* Related */}
      <ProductRow title='Also bought' products={product.alsoBought} />
      <ProductRow title='Bought together' products={product.boughtTogether} />
      <ProductRow
        title='Buy after viewing'
        products={product.buyAfterViewing}
      />
      <ProductRow title='Also viewed' products={product.alsoViewed} />
    </Container>
  )
}

export const getStaticProps: GetStaticProps<
  ProductDetailsProps,
  { id: string }
> = async (context) => {
  const id = context.params?.id
  //get product
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      alsoBought: true,
      alsoViewed: true,
      boughtTogether: true,
      buyAfterViewing: true,
    },
  })
  //not found
  if (!product) {
    return {
      notFound: true,
    }
  }
  //revalidate
  return {
    props: {
      product,
    },
    revalidate: 100,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //todo
    fallback: true,
  }
}
