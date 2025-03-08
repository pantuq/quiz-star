import { useRequest } from 'ahooks'
import React, { memo, FC, useState } from 'react'
import { getQuestionStatListService } from '../../../services/stat.ts'
import { useParams } from 'react-router-dom'
import { Spin, Typography } from 'antd'

const { Title } = Typography

type PropsType = {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
  }

const PageStat: FC<PropsType> = memo(function PageStat(props: PropsType) {
    const { id = '' } = useParams()
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    const { loading } = useRequest(async () => {
        const res = await getQuestionStatListService(id, { page: 1, pageSize: 10})
        return res
    },{
        onSuccess(res){
            const { total, list = [] } = res
            setTotal(total)
            setList(list)
        }
    })
    return (
        <div>
            <Title>答卷数量： {!loading && total}</Title>
            {loading && (<div style={{ textAlign: 'center' }}><Spin/></div>)}
        </div>
    )
})



export default PageStat