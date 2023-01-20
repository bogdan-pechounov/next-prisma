import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

type ProductDetailsProps = {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return <div>{product.title}</div>
}

function parseId(id: string | undefined) {
  if (id) {
    const parsedId = parseInt(id)
    if (!isNaN(parsedId)) {
      return parsedId
    }
  }
}

export const getStaticProps: GetStaticProps<
  ProductDetailsProps,
  { id: string }
> = async (context) => {
  //parse id
  const id = parseId(context.params?.id)
  if (!id) {
    return {
      notFound: true,
    }
  }
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
    fallback: 'blocking',
  }
}
