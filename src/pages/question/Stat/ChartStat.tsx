import { Typography } from 'antd'
import React, { memo, FC, useEffect, useState } from 'react'
import { getComponentStatService } from '../../../services/stat.ts'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '../../../components/QuestionComponents/index.ts'

const { Title } = Typography

type PropsType = {
    selectedComponentId: string,
    selectedComponentType: string
}

const ChartStat: FC<PropsType> = memo(function ChartStat(props: PropsType) {
    const { selectedComponentId, selectedComponentType } = props
    const { id } = useParams()

    const [stat, setStat] = useState([])
    const { run } = useRequest(
      async (questionId, componentId) =>
        await getComponentStatService(questionId, componentId),
      {
        manual: true,
        onSuccess: (res) => {
          setStat(res.stat);
        }
      }
    );

    useEffect(() => {
      if (id && selectedComponentId) run(id, selectedComponentId);
    }, [id, selectedComponentId]);

    function genStatElem(){
        if(!selectedComponentId) return <div>未选中组件</div>

        const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
        if(!StatComponent) return <div>该组件没有统计数据</div>

        return <StatComponent stat={stat} />
    }
    return (
        <>
            <Title level={3}>图表统计</Title>
            <div>{genStatElem()}</div>
        </>
    )
})



export default ChartStat