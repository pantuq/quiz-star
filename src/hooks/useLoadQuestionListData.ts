import { useRequest } from "ahooks";
import { useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE_DEFAULT } from "../constants/index.tsx";
import { getQuestionListService } from "../services/question.ts";

type OptionType = {
    isStar: boolean,
    isDeleted: boolean,
    page: number,
    pageSize: number
}

// 抽离的公共代码： 根据 isStar, isDeleted, page, pageSize 调用 getQuestionListService（axios请求） 获取问卷列表
export default function useLoadQuestionListData(opt: Partial<OptionType> = {}){
    const { isStar, isDeleted } = opt

    const [searchParams] = useSearchParams()
    
    const { data, loading, error, refresh } = useRequest(async () => {
        // refresh 重新加载当前数据，手动刷新
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
        const pageSize = Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE_DEFAULT

        const data = await getQuestionListService({ keyword, isDeleted, isStar, page, pageSize })
        return data
    },{
        refreshDeps: [searchParams] //刷新的依赖项
    })

    return { data, loading, error, refresh }
}