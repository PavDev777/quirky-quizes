import { QuizData } from '../../../interfaces'
import s from './title.module.scss'

interface ITitleProps {
  title: QuizData['title'] | undefined
  subtitle: QuizData['subtitle'] | undefined
}

export const Title = ({ title, subtitle }: ITitleProps) => {
  return (
    <div className={s.title}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
