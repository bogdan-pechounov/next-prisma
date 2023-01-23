import { Product } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
  products: { [key: string]: Product & { count: number } }
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
      state.products[product.id] = { ...product, count: 1 }
    },
    remove(state, action: PayloadAction<Product>) {
      const product = action.payload
      delete state.products[product.id]
    },
  },
})

export default cartSlice
