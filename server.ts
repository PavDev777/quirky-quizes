import express, { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import { QuizData } from './interfaces'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = 8000
const app = express()

app.get('/quiz-item', async (req: Request, res: Response) => {
  try {
    const response: AxiosResponse = await axios.get(String(process.env.URL), {
      headers: {
        'X-Cassandra-Token': process.env.TOKEN,
        accept: 'application/json'
      }
    })
    if (response.status === 200) {
      const quizItem: QuizData = await response.data.data[
        'a8f1d126-3387-4856-ad59-9a6755c04288'
      ]
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.send(quizItem)
    }
  } catch (error) {
    console.error(error)
  }
})

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT)
})
