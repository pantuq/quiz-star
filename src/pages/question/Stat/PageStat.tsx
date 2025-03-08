import { useRequest } from 'ahooks'
import React, { memo, FC, useState } from 'react'
import { getQuestionStatListService } from '../../../services/stat.ts'
import { useParams } from 'react-router-dom'
import { Spin, Table, Typography } from 'antd'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'

const { Title } = Typography

type PropsType = {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
  }

const PageStat: FC<PropsType> = memo(function PageStat(props: PropsType) {
    const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
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

    const { componentList } = useGetCompoentsInfo()
    const colums = componentList.map(c => {
        const { fe_id, title, props = {}, type } = c
        const colTitle = props!.title || title

        return {
            title: (
                <div style={{ cursor: 'pointer'}} onClick={() => {
                    setSelectedComponentId(fe_id)
                    setSelectedComponentType(type)
                }}>
                    <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : '' }}>{colTitle}</span>
                </div>
            ),
            dataIndex: fe_id
        }
    })    

    const dataSource = list.map((item: any) => ({...item, key: item._id}))
    const TableElem = <Table columns={colums} dataSource={dataSource} pagination={false}></Table>
    
    return (
        <div>
            <Title>答卷数量： {!loading && total}</Title>
            {loading && (<div style={{ textAlign: 'center' }}><Spin/></div>)}
            {!loading && TableElem}
        </div>
    )
})



export default PageStat