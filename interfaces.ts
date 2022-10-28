interface QuizData {
  title: string
  quizId: string
  subtitle: string
  content: Content[]
  answers: Answer[]
}

interface Answer {
  combination: string[]
  text: string
  image: string
  alt: string
}

interface Content {
  id: number
  text: string
  questions: Question[]
}

interface Question {
  text: string
  image: string
  alt: string
  credit: string
}

export type { QuizData, Answer, Content, Question }
