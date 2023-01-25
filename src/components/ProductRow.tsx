import React from 'react'
import ProductItem from '@/components/ProductItem'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Keyboard, Mousewheel } from 'swiper'
import { Product } from '@prisma/client'
import { Box, Typography } from '@mui/material'

type ProductRowProps = {
  title: String
  products: Product[]
}

function ProductRow({ title, products }: ProductRowProps) {
  if (products.length === 0) return <></>

  return (
    <>
      <Typography variant='h5'>{title}</Typography>
      <Swiper
        modules={[Keyboard, Mousewheel]}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
        keyboard={{ enabled: true, onlyInViewport: true }}
        mousewheel={{ forceToAxis: true }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} style={{ width: '300px' }}>
            <Box p={1}>
              <ProductItem product={product} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ProductRow
