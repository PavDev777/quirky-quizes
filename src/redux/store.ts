import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import quizReducer from '../redux/slices/quiz/slice'

export const store = configureStore({
  reducer: {
    quiz: quizReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
