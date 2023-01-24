import cartSlice from '@/lib/store/cartSlice'
import { useAppDispatch, useAppSelector, useCart } from '@/lib/store/hooks'
import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import React, { useState, useMemo } from 'react'
import CartIcon from './CartIcon'

function CartDrawer() {
  const [open, setOpen] = useState(false)
  const { productArray, totalPrice } = useCart()
  const dispatch = useAppDispatch()

  return (
    <>
      <CartIcon onClick={() => setOpen(true)} />
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box width={500}>
          <List>
            {productArray.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={`${product.title} | ${product.price} | ${product.quantity}`}
                />
                <ButtonGroup
                  variant='contained'
                  aria-label='outlined primary button group'
                >
                  <Button
                    onClick={() =>
                      dispatch(cartSlice.actions.increase(product))
                    }
                  >
                    +
                  </Button>
                  <Button
                    onClick={() =>
                      dispatch(cartSlice.actions.decrease(product))
                    }
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => dispatch(cartSlice.actions.remove(product))}
                  >
                    x
                  </Button>
                </ButtonGroup>
              </ListItem>
            ))}
          </List>
          <Typography>Total price: {totalPrice}</Typography>
        </Box>
      </Drawer>
    </>
  )
}

export default CartDrawer
