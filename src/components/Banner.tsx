import { useTheme } from '@emotion/react'
import { Box, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Stack } from '@mui/system'
import { Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type Props = {
  bannerProduct: Product
}

const BannerContainer = styled(Box)(() => ({
  background: grey[200],
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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const width = matches ? 400 : 300

  return (
    <BannerContainer>
      <BannerContent direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Box>
          <Image
            src={bannerProduct?.imgUrl}
            width={width}
            height={width}
            alt={bannerProduct?.title}
            style={{ mixBlendMode: 'multiply' }} // make background transparent
            priority
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
