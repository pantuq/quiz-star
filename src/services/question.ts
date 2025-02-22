import axios from './ajax.ts'

// 获取单个问卷信息
export async function getQuestionService(id: string) {
    const url = `/api/question/${id}`
    const data = await axios.get(url)
    return data
}

// 创建问卷
export async function createQuestionService(){
    const url = '/api/question'
    const data = await axios.post(url)
    // const res = {
    //     data
    // }
    return data
}