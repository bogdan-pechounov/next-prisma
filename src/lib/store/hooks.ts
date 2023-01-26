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

  const productArray = useMemo(() => Object.values(cart.items), [cart.items])
  const totalPrice = useMemo(
    () =>
      productArray.reduce(
        (accumulator, { product, quantity }) =>
          accumulator + product.price * quantity,
        0
      ),
    [productArray]
  )

  async function add(product: Product) {
    try {
      await axios.post('/api/cart', { product })
    } catch (err) {
      console.error(err)
    }
    dispatch(cartSlice.actions.add(product))
  }

  async function remove(product: Product) {
    try {
      await axios.delete(`/api/cart/${product.id}`)
    } catch (err) {
      console.error(err)
    }
    dispatch(cartSlice.actions.remove(product))
  }

  async function increase(product: Product) {
    try {
      const quantity = cart.items[product.id].quantity + 1
      await axios.put(`/api/cart/${product.id}`, { quantity })
    } catch (err) {
      console.error(err)
    }
    dispatch(cartSlice.actions.increase(product))
  }

  async function decrease(product: Product) {
    try {
      const quantity = cart.items[product.id].quantity - 1
      await axios.put(`/api/cart/${product.id}`, { quantity })
    } catch (err) {
      console.error(err)
    }
    dispatch(cartSlice.actions.decrease(product))
  }
  return { cart, productArray, totalPrice, add, remove, increase, decrease }
}
