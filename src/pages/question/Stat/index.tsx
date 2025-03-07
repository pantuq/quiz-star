import React, { memo, FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'
import { Button, Result, Spin } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo.ts'
import { useNavigate } from 'react-router-dom'

const Stat: FC = memo(function Stat() {
    const nav = useNavigate()
    const { loading } = useLoadQuestionData()
    const { isPublished } = useGetPageInfo()

    if(loading){
        return (
            <div style={{ textAlign: 'center', marginTop: '60xp'}}>
                <Spin/>
            </div>
        )
    }

    if(!isPublished){
        return <Result
        status="warning"
        title="该页面尚未发布"
        subTitle="抱歉，您访问的页面不存在"
        extra={<Button type="primary" onClick={() => nav(-1)}>返回上一页</Button>}
      />
    }
    return (
        <div>
            <p>Stat page</p>
            { loading ? <p>loading</p> : <p></p>}
        </div>
    )
})



export default Stat