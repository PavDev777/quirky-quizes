import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuizData } from '../../../../interfaces'
import { takeIds } from '../../../utils/takeIds'
import { IQuizInitialState } from './types'

const initialState: IQuizInitialState = {
  quiz: null,
  unansweredQuestionsIds: [],
  chosenAnswerItems: [],
  loading: false,
  error: ''
}

export const fetchQuiz = createAsyncThunk(
  'quiz/fetchQuiz',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8000/quiz-item')
      if (!response.ok) {
        throw new Error('Server error')
      }
      const data = (await response.json()) as QuizData
      data && dispatch(addedItems(data))
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addedItems(state, action: PayloadAction<QuizData>) {
      if (action.payload) {
        state.quiz = action.payload
        state.unansweredQuestionsIds = takeIds(state.quiz)
      }
    },
    setUnansweredQuestionsIds(state, action: PayloadAction<number>) {
      state.unansweredQuestionsIds = state.unansweredQuestionsIds?.filter(
        (id: number) => id !== action.payload
      )
    },
    setChosenAnswerItems(state, action: PayloadAction<string>) {
      state.chosenAnswerItems.push(action.payload)
    },
    closeAnswerBlock(state) {
      if (state.quiz) state.unansweredQuestionsIds = takeIds(state.quiz)
      state.chosenAnswerItems = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchQuiz.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchQuiz.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(fetchQuiz.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const {
  addedItems,
  setUnansweredQuestionsIds,
  setChosenAnswerItems,
  closeAnswerBlock
} = quizSlice.actions

export default quizSlice.reducer
