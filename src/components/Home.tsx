import { Title } from './Title'
import { Content } from '../../interfaces'
import { QuestionsBlock } from './QuestionsBlock/'
import { AnswerBlock } from './AnswerBlock/'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  chosenAnswerItemsSelector,
  errorSelector,
  loadingSelector,
  quizSelector,
  unansweredQuestionsIdsSelector
} from '../redux/slices/quiz/selectors'
import { createRef, useEffect, useState } from 'react'
import { Error } from './Error/Error'
import { Loader } from '../Loader'
import { closeAnswerBlock, fetchQuiz } from '../redux/slices/quiz/slice'

export const Home = () => {
  const quiz = useAppSelector(quizSelector)
  const chosenAnswerItems = useAppSelector(chosenAnswerItemsSelector)
  const unansweredQuestionsIds = useAppSelector(unansweredQuestionsIdsSelector)
  const [showAnswer, setShowAnswer] = useState(false)
  const dispatch = useAppDispatch()
  const errorState = useAppSelector(errorSelector)
  const loader = useAppSelector(loadingSelector)

  type ReduceType = {
    id?: {}
  }

  const refs = unansweredQuestionsIds?.reduce<ReduceType | any>((acc, id) => {
    acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>()
    return acc
  }, {})

  const answerRef = createRef<HTMLDivElement | null>()

  useEffect(() => {
    dispatch(fetchQuiz())
  }, [])

  useEffect(() => {
    if (chosenAnswerItems.length > 0 && unansweredQuestionsIds) {
      if (showAnswer && answerRef.current) {
        answerRef.current.scrollIntoView({ behavior: 'smooth' })
      }
      if (unansweredQuestionsIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true)
      } else {
        const highestId = Math.min(...unansweredQuestionsIds)
        refs[highestId]?.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [
    unansweredQuestionsIds,
    chosenAnswerItems,
    showAnswer,
    refs,
    answerRef.current
  ])

  const handleCloseAnswerBlock = () => {
    dispatch(closeAnswerBlock())
    setShowAnswer(false)
  }

  if (errorState) {
    return <Error />
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Title title={quiz?.title} subtitle={quiz?.subtitle} />
          {quiz?.content.map((content: Content) => (
            <QuestionsBlock
              key={content.id}
              quizItem={content}
              ref={refs[content.id]}
            />
          ))}
          {showAnswer && (
            <AnswerBlock
              ref={answerRef}
              answerOptions={quiz?.answers}
              chosenAnswers={chosenAnswerItems}
              handleCloseAnswerBlock={handleCloseAnswerBlock}
            />
          )}
        </>
      )}
    </>
  )
}
