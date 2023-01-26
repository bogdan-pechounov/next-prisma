import { Product } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: { [productId: string]: CartItem }
}

const initialState: CartState = {
  items: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    set(state, action: PayloadAction<CartItem[]>) {
      const cart = action.payload
      for (const { product, quantity } of cart) {
        state.items[product.id] = { product, quantity }
      }
    },
    add(state, action: PayloadAction<Product>) {
      const product = action.payload
      state.items[product.id] = { product, quantity: 1 }
    },
    remove(state, action: PayloadAction<Product>) {
      const product = action.payload
      delete state.items[product.id]
    },
    increase(state, action: PayloadAction<Product>) {
      const product = state.items[action.payload.id]
      product.quantity = Math.min(product.quantity + 1, 20)
    },
    decrease(state, action: PayloadAction<Product>) {
      const product = state.items[action.payload.id]
      product.quantity = Math.max(product.quantity - 1, 1)
    },
  },
})

export default cartSlice
