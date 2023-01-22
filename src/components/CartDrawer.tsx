import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import React, { useState } from 'react'
import CartIcon from './CartIcon'

function CartDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <CartIcon onClick={() => setOpen(true)} />
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box width={250}></Box>
      </Drawer>
    </>
  )
}

export default CartDrawer
