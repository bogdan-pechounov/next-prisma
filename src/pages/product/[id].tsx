import LinearIndeterminate from '@/components/LinearIndeterminate'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

type ProductDetailsProps = {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter()

  if (router.isFallback) return <LinearIndeterminate />
  return <div>{product.title}</div>
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

  return {
    props: {
      product,
    },
    revalidate: 100,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}
