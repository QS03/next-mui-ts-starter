import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface HelloState {
  message: string
}

// Define the initial state using that type
const initialState: HelloState = {
  message: "Hi, there!",
}

export const helloSlice = createSlice({
  name: 'hello',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    greeting: (state) => {
      state.message = "Hello, Redux Toolkit!"
    },
  },
})

export const { greeting } = helloSlice.actions

export default helloSlice.reducer