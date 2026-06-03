import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // auth, ui, notifications slices + RTK Query APIs — Phase 1+
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
