import { QuizData } from '../../../../interfaces'

export interface IQuizInitialState {
  quiz: QuizData | null
  unansweredQuestionsIds: number[] | undefined
  chosenAnswerItems: string[]
  loading: boolean
  error: string | unknown
}
