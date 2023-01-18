import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { GetServerSideProps, GetStaticProps } from 'next'
import Image from 'next/image'

type ProductsProps = {
  products: Product[]
}

export default function Products({ products }: ProductsProps) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.asin}>
          <h1>{product.title}</h1>
          <img src={product.imgUrl} alt='product image' />
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await prisma.product.findMany()
  return {
    props: {
      products,
    },
  }
}
