import { dnsResponseMain } from '@/types/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// Define the DNSState type with data as dnsResponseMain or an empty array
export interface DNSState {
    data: dnsResponseMain | []
}

const initialState: DNSState = {
    data: []
}

// Create a slice with the correct payload type for addData
export const dnsSlice = createSlice({
    name: 'dnsState',
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<dnsResponseMain>) => {
            state.data = action.payload
        },
    },
})

// Export the action and the reducer
export const { addData } = dnsSlice.actions
export default dnsSlice.reducer

