import axios, { ResDataType} from './ajax.ts'

// 获取问卷的列表
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = await axios.get(url, { params: opt });
  return data;
}