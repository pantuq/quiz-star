import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question.ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer/index.ts";

export default function useLoadQuestionData(){
    const { id = ''} = useParams()
    const dispatch = useDispatch()

    // ajax加载
    const { data, loading, error, run } = useRequest(
      async (id: string) => {
        if (!id) throw new Error("id不能为空");
        const data = await getQuestionService(id);
        return data;
      },
      {
        manual: true,
      }
    );

    // 根据获取的data设置redux store
    useEffect(() => {
        if(!data) return 
        const { title = '', componentList = [] } = data

        // 获取默认的selectedID
        let selectedId = ''
        if(componentList.length > 0){
          selectedId = componentList[0].fe_id   // 默认选中第一个组件
        }
        // 把componentList存储到redux store中
        dispatch(resetComponents({componentList, selectedId}))
    },[data])

    // 判断id变化，执行ajax加载问卷数据
    useEffect(() => {
      run(id);
    }, [id]);

    return { loading, error}
}