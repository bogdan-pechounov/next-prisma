import Banner from '@/components/Banner'
import LinearIndeterminate from '@/components/LinearIndeterminate'
import ProductRow from '@/components/ProductRow'
import prisma from '@/lib/prisma'
import { Container } from '@mui/material'
import { Product } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

type Props = {
  bannerProduct: Product | null
  categories: {
    category: string
    products: Product[]
  }[]
}

const POPULAR_CATEGORIES = [
  'Electronics',
  'Computers & Accessories',
  'Camera & Photo',
  'Accessories & Supplies',
  'Laptop & Netbook Computer Accessories',
  'Cables & Accessories',
  'Audio & Video Accessories',
  'Accessories',
  'Batteries',
  'Cables & Interconnects',
  'Car & Vehicle Electronics',
  'Computer Components',
  'Chargers & Adapters',
  'Cases',
  'Portable Audio & Video',
  'Touch Screen Tablet Accessories',
  'Bags & Cases',
  'MP3 Players & Accessories',
  'Cases & Sleeves',
  'Car Electronics',
]
export default function Home({ bannerProduct, categories }: Props) {
  return (
    <Container>
      {bannerProduct && <Banner bannerProduct={bannerProduct} />}
      {categories.map(({ category, products }) => (
        <ProductRow key={category} title={category} products={products} />
      ))}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [bannerProduct, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: 'B00KYB9Q64' },
    }),
    Promise.all(
      POPULAR_CATEGORIES.map(async (category) => ({
        category,
        products: await prisma.product.findMany({
          where: {
            categories: {
              has: category,
            },
          },
          take: 20,
        }),
      }))
    ),
  ])

  return {
    props: {
      bannerProduct,
      categories,
    },
  }
}
