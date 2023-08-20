import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import wishListSlice from './wishListSlice'

export const store = configureStore({
  reducer: {
    cart:cartSlice,
    wishList:wishListSlice
  },
})