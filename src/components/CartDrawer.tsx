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
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CartIcon from './CartIcon'

function CartDrawer() {
  const [open, setOpen] = useState(false)
  const { productArray, totalPrice, remove, increase, decrease } = useCart()
  const dispatch = useAppDispatch()

  //load cart items
  useEffect(() => {
    axios.get('/api/cart').then(({ data: cart }) => {
      console.log(cart)
      dispatch(cartSlice.actions.set(cart))
    })
  }, [])

  return (
    <>
      <CartIcon onClick={() => setOpen(true)} />
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box width={500}>
          <List>
            {productArray.map(({ product, quantity }) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={`${product.title} | ${product.price} | ${quantity}`}
                />
                <ButtonGroup
                  variant='contained'
                  aria-label='outlined primary button group'
                >
                  <Button onClick={() => increase(product)}>+</Button>
                  <Button onClick={() => decrease(product)}>-</Button>
                  <Button onClick={() => remove(product)}>x</Button>
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
