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
  Box,
  Stack,
  Icon,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
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
          <Stack direction='row' pb={1}>
            <ListItemText primary={product.title} />
            {/* Remove */}
            <Button
              color='error'
              onClick={(e) => {
                e.preventDefault()
                remove(product)
              }}
            >
              <CloseIcon />
            </Button>
          </Stack>
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
              </ButtonGroup>
            </Box>
          </Stack>
        </Link>
      </ListItemButton>
    </ListItem>
  )
}

export default CartDrawerItem
