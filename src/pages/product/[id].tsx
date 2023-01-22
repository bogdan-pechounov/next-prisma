import LinearIndeterminate from '@/components/LinearIndeterminate'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { Box, Container, Stack } from '@mui/system'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { increment } from '@/lib/counterSlide'

type ProductDetailsProps = {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter()
  const dispatch = useDispatch()

  //loading indicator
  if (router.isFallback) return <LinearIndeterminate />

  return (
    <Container>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <Box flex='1 1 40%' position='relative' minHeight={300}>
          <Image
            src={product.imgUrl}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
          />
        </Box>
        <Box flex='1 1 60%'>
          <Typography variant='h4'>{product.title}</Typography>
          <Typography>{product.brand}</Typography>
          <Typography>{product.description}</Typography>
          <Button variant='outlined' onClick={() => dispatch(increment())}>
            Add to cart
          </Button>
        </Box>
      </Stack>
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
