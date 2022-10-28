import { Content, QuizData } from '../../interfaces'

export const takeIds = (quiz: QuizData) => {
  const unansweredIds = quiz?.content?.map(({ id }: Content) => id)
  return unansweredIds
}
