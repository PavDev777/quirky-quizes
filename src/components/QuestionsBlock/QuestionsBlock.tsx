import { Content, Question } from '../../../interfaces'
import { QuestionBlock } from '../QuestionBlock'
import React, { forwardRef } from 'react'
import s from './questionsBlock.module.scss'

interface IQuestionsBlockProps {
  quizItem: Content
}

export const QuestionsBlock = forwardRef(
  (
    { quizItem }: IQuestionsBlockProps,
    ref: React.LegacyRef<HTMLHeadingElement> | undefined
  ) => {
    return (
      <>
        <h2 className={s.questionsTitle} ref={ref}>
          {quizItem.text}
        </h2>
        <div className={s.questionsContainer}>
          {quizItem?.questions.map((question: Question, _index) => (
            <QuestionBlock
              key={_index}
              quizItemId={quizItem.id}
              question={question}
            />
          ))}
        </div>
      </>
    )
  }
)
