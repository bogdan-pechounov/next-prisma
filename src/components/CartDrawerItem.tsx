import { formatPrice } from '@/lib/format'
import { CartItem } from '@/lib/store/cartSlice'
import { useCart } from '@/lib/store/hooks'
import {
  Button,
  ButtonGroup,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  ListItemIcon,
  Box,
  Stack,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'

type CartDrawerItemProps = {
  cartItem: CartItem
}

function CartDrawerItem({
  cartItem: { quantity, product },
}: CartDrawerItemProps) {
  const { remove, increase, decrease } = useCart()

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Link href={`/product/${product.id}`} style={{ width: '100%' }}>
          {/* Title */}
          <ListItemText primary={product.title} />
          {/* Button group */}
          <Stack direction='row'>
            <Box>
              <Typography variant='subtitle1'>
                {formatPrice(product.price)}
              </Typography>
            </Box>
            <Box ml='auto' onClick={(e) => e.preventDefault()}>
              <ButtonGroup
                variant='contained'
                aria-label='outlined primary button group'
              >
                <Button onClick={() => decrease(product)}>-</Button>
                <Button variant='outlined'>{quantity}</Button>
                <Button onClick={() => increase(product)}>+</Button>
                {/* <Button onClick={() => remove(product)}>x</Button> */}
              </ButtonGroup>
            </Box>
          </Stack>
        </Link>
      </ListItemButton>
    </ListItem>
  )
}

export default CartDrawerItem
