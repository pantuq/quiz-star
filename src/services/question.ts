import axios from './ajax.ts'

export async function getQuestionService(id: string) {
    const url = `/api/question/${id}`
    const data = await axios.get(url)
    return data
}