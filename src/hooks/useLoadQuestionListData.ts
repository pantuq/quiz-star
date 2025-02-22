import { useRequest } from "ahooks";
import { useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../constants/index.tsx";
import { getQuestionListService } from "../services/question.ts";

type OptionType = {
    isStar: boolean,
    isDeleted: boolean
}
export default function useLoadQuestionListData(opt: Partial<OptionType> = {}){
    const { isStar, isDeleted } = opt

    const [searchParams] = useSearchParams()
    
    const { data, loading, error } = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

        const data = await getQuestionListService({ keyword, isDeleted, isStar })
        return data
    },{
        refreshDeps: [searchParams] //刷新的依赖项
    })

    return { data, loading, error }
}