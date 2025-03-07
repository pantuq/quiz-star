import React, { memo, FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'
import { Button, Result, Spin } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo.ts'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'

const Stat: FC = memo(function Stat() {
    const nav = useNavigate()
    const { loading } = useLoadQuestionData()
    const { isPublished, title } = useGetPageInfo()

    // 修改标题
    useTitle(`问卷统计 - ${title}`)

    const LoadingElem = (<div style={{ textAlign: 'center', marginTop: '60xp'}}>
                            <Spin/>
                        </div>)

    function genContentElem(){
        if(typeof isPublished === 'boolean' && !isPublished){
            // 因为没有设默认值，isPublished为undefined 所以要在这里判断一下
            // 如果isPublshed的类型是布尔值的话，就执行
            return <div style={{ flex: '1' }}>
                <Result
                status="warning"
                title="该页面尚未发布"
                subTitle="抱歉，您访问的页面不存在"
                extra={<Button type="primary" onClick={() => nav(-1)}>返回上一页</Button>}
                />
            </div>
        }

        return (
            <>
            <div className={styles.left}>左侧</div>
            <div className={styles.main}>中间</div>
            <div className={styles.right}>右侧</div>
            </>
        )
    }
    return (
      <div className={styles.container}>
        <div>Header</div>
        <div className={styles["content-wrapper"]}>
          {loading && LoadingElem}
          {!loading && <div className={styles.content}>{genContentElem()}</div>}
        </div>
      </div>
    );
})



export default Stat