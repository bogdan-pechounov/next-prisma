import { useAppSelector, useCart } from '@/lib/store/hooks'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import React, { useState, useMemo } from 'react'
import CartIcon from './CartIcon'

function CartDrawer() {
  const [open, setOpen] = useState(false)
  const { productArray } = useCart()

  return (
    <>
      <CartIcon onClick={() => setOpen(true)} />
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box width={400}>
          {productArray.map((product) => (
            <div key={product.id}>
              {product.title} | {product.count}
            </div>
          ))}
        </Box>
      </Drawer>
    </>
  )
}

export default CartDrawer
