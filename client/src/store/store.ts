import { configureStore } from '@reduxjs/toolkit'
import dnsReducer from './dns/dnsSlice'

export const store = configureStore({
    reducer: {
        dns: dnsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch