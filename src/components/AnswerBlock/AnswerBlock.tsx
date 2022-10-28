import React, { forwardRef, useEffect, useState } from 'react'
import { Answer } from '../../../interfaces'
import { CloseIcon } from '../CloseIcon'
import s from './answerBlock.module.scss'

interface IAnswerBlock {
  answerOptions: Answer[] | undefined
  chosenAnswers: string[]
  handleCloseAnswerBlock: () => void
}

export const AnswerBlock = forwardRef(
  (
    { answerOptions, chosenAnswers, handleCloseAnswerBlock }: IAnswerBlock,
    ref: HTMLDivElement | any
  ) => {
    const [result, setResult] = useState<Answer | null>()

    useEffect(() => {
      answerOptions?.forEach((answer: Answer) => {
        if (
          chosenAnswers.includes(answer.combination[0]) &&
          chosenAnswers.includes(answer.combination[1]) &&
          chosenAnswers.includes(answer.combination[2])
        ) {
          setResult(answer)
        }
      })
    }, [chosenAnswers, answerOptions])

    useEffect(() => {
      document.body.style.overflowY = 'hidden'
      return () => {
        document.body.style.overflowY = 'scroll'
      }
    }, [])

    return (
      <div
        ref={ref}
        className={s.answerOverlay}
        onClick={handleCloseAnswerBlock}
      >
        <div className={s.answerBlock}>
          <h2>{result?.text}</h2>
          <img src={result?.image} alt={result?.alt} />
          <CloseIcon onClose={handleCloseAnswerBlock} />
        </div>
      </div>
    )
  }
)
