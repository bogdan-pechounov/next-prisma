import { formatPrice } from '@/lib/format'
import cartSlice from '@/lib/store/cartSlice'
import { useAppDispatch, useCart } from '@/lib/store/hooks'
import { List, Typography, Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CartDrawerItem from './CartDrawerItem'
import CartIcon from './CartIcon'

function CartDrawer() {
  const [open, setOpen] = useState(false)
  const { productArray, totalPrice } = useCart()
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
            {productArray.map((cartItem) => (
              <CartDrawerItem key={cartItem.product.id} cartItem={cartItem} />
            ))}
          </List>
          <Divider />
          <Typography>Total price: {formatPrice(totalPrice)}</Typography>
        </Box>
      </Drawer>
    </>
  )
}

export default CartDrawer
