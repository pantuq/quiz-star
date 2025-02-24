import axios, { ResDataType} from './ajax.ts'

type SearchOption = {
    keyword?: string,
    isStar: boolean,
    isDeleted: boolean
    page: number
    pageSize: number
    // sort
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = await axios.get(url)
    return data
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
    const url = '/api/question'
    const data = await axios.post(url)
    // const res = {
    //     data
    // }
    return data
}

// 获取(查询)所有问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = "/api/question";
  const data = await axios.get(url, { params: opt });
  return data;
}
// Partial, 只要类型符合，有这个一部分也行

// 更新单个问卷
export async function updateQuestionService(id: string, opt: { [key: string]: any }): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = await axios.patch(url, opt)
  return data
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType>{
  const url = `/api/question/duplicate/${id}`
  const data = await axios.post(url)
  return data
}