import { RootState } from '../../store'

export const quizSelector = (state: RootState) => state.quiz.quiz
export const unansweredQuestionsIdsSelector = (state: RootState) =>
  state.quiz.unansweredQuestionsIds
export const chosenAnswerItemsSelector = (state: RootState) =>
  state.quiz.chosenAnswerItems
export const errorSelector = (state: RootState) => state.quiz.error
export const loadingSelector = (state: RootState) => state.quiz.loading
