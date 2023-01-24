import { Product } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
  products: { [key: string]: Product & { quantity: number } }
}

const initialState: CartState = {
  products: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Product>) {
      const product = action.payload
      state.products[product.id] = { ...product, quantity: 1 }
    },
    remove(state, action: PayloadAction<Product>) {
      const product = action.payload
      delete state.products[product.id]
    },
    increase(state, action: PayloadAction<Product>) {
      const product = state.products[action.payload.id]
      product.quantity = Math.min(product.quantity + 1, 20)
    },
    decrease(state, action: PayloadAction<Product>) {
      const product = state.products[action.payload.id]
      product.quantity = Math.max(product.quantity - 1, 1)
    },
  },
})

export default cartSlice
