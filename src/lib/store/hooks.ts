import { useSelector } from 'react-redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { useMemo } from 'react'
import cartSlice from './cartSlice'
import { Product } from '@prisma/client'
import axios from 'axios'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useCart() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)

  const productArray = useMemo(
    () => Object.values(cart.products),
    [cart.products]
  )
  const totalPrice = useMemo(
    () =>
      productArray.reduce(
        (accumulator, product) =>
          accumulator + product.price * product.quantity,
        0
      ),
    [productArray]
  )

  async function add(product: Product) {
    try {
      await axios.post('/api/cart', { product })
      dispatch(cartSlice.actions.add(product))
    } catch (err) {
      console.error(err)
    }
  }
  return { cart, productArray, totalPrice, add }
}
