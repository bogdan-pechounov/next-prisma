import { Box, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Stack } from '@mui/system'
import { Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type Props = {
  bannerProduct: Product
}

const BannerContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.light,
  color: 'white',
  borderRadius: '5px 20px 20px 5px',
}))

const BannerContent = styled(Stack)(({ theme }) => ({
  padding: '20px',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },
}))

const Title = styled(Typography)(() => ({
  marginBottom: '20px',
}))

const Description = styled(Typography)(() => ({}))

function Banner({ bannerProduct }: Props) {
  return (
    <BannerContainer marginBottom={5}>
      <BannerContent direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Box>
          <Image
            src={bannerProduct?.imgUrl}
            width={350}
            height={350}
            alt={bannerProduct?.title}
            // style={{ mixBlendMode: 'multiply' }} // make background transparent
            priority
            style={{
              borderRadius: '10px',
              padding: '10px',
              background: 'white',
            }}
          />
        </Box>
        <Box>
          <Title variant='h5'>Return to School</Title>
          <Title variant='h1'>Laptop Sales</Title>
          <Description variant='subtitle1'>
            Consequat ipsum pariatur voluptate Lorem laboris aliquip sint amet
            labore aute nostrud. Est consequat reprehenderit et adipisicing enim
            velit. Incididunt dolore mollit nostrud eiusmod ad et non qui.
          </Description>
        </Box>
      </BannerContent>
    </BannerContainer>
  )
}

export default Banner
