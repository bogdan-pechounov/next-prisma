import { useSelector } from 'react-redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { useMemo } from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useCart() {
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
  return { cart, productArray, totalPrice }
}
