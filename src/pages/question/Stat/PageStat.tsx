import { useRequest } from 'ahooks'
import React, { memo, FC, useState } from 'react'
import { getQuestionStatListService } from '../../../services/stat.ts'
import { useParams } from 'react-router-dom'
import { Pagination, Spin, Table, Typography } from 'antd'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'
import { STAT_PAGE_SIZE_DEFAULT } from '../../../constants/index.tsx'

const { Title } = Typography

type PropsType = {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
  }

const PageStat: FC<PropsType> = memo(function PageStat(props: PropsType) {
    const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

    const { id = '' } = useParams()

    const [page, setPage] = useState(1)
    const [pageSize,setPageSize] = useState(STAT_PAGE_SIZE_DEFAULT)
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    const { loading } = useRequest(async () => {
        const res = await getQuestionStatListService(id, { page, pageSize})
        return res
    },{
        refreshDeps: [id, page, pageSize], //依赖某些变量 变化时重新请求
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
    const TableElem = (
      <>
        <Table
          columns={colums}
          dataSource={dataSource}
          pagination={false}
        ></Table>
        <div style={{ textAlign: 'center', marginTop: '18px'}}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPageSize(pageSize);
            setPage(page);
          }}
        />
        </div>
      </>
    );
    
    return (
        <div>
            <Title>答卷数量： {!loading && total}</Title>
            {loading && (<div style={{ textAlign: 'center' }}><Spin/></div>)}
            {!loading && TableElem}
        </div>
    )
})



export default PageStat