import { configureStore } from '@reduxjs/toolkit'
import carouselReducer from './features/carouselSlice'
import productReducer from './features/productSlice'

export const store = configureStore({
    reducer: {
        carousel: carouselReducer,
        product: productReducer
  }
})