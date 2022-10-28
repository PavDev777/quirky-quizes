import { Question } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  setChosenAnswerItems,
  setUnansweredQuestionsIds
} from '../../redux/slices/quiz/slice'
import s from './questionBlock.module.scss'
import {
  chosenAnswerItemsSelector,
  unansweredQuestionsIdsSelector
} from '../../redux/slices/quiz/selectors'

interface IQuestionBlockProps {
  question: Question
  quizItemId: number
}

export const QuestionBlock = ({
  question,
  quizItemId
}: IQuestionBlockProps) => {
  const chosenAnswerItems = useAppSelector(chosenAnswerItemsSelector)
  const unansweredQuestionsIds = useAppSelector(unansweredQuestionsIdsSelector)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setUnansweredQuestionsIds(quizItemId))
    dispatch(setChosenAnswerItems(question.text))
  }

  const validPick =
    !chosenAnswerItems?.includes(question.text) &&
    !unansweredQuestionsIds?.includes(quizItemId)

  return (
    <button
      className={s.questionBlock}
      onClick={handleClick}
      disabled={validPick}
    >
      <div className={s.questionImage}>
        <img src={question.image} alt={question.alt} />
      </div>
      <h3>{question.text}</h3>
      <a href={question.image}>{question.credit}</a>
    </button>
  )
}
