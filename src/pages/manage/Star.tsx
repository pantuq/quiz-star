import { useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import React, { memo, FC } from 'react'
import styles from './Common.module.scss'
import QuestionCard from '../../components/QuestionCard.tsx'
import ListSearch from '../../components/ListSearch.tsx'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData.ts'
import ListPage from '../../components/ListPage.tsx'

const Star: FC = memo(function Star() {

    useTitle('问卷-星标问卷')

    const {Title} = Typography

    const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
    const { list = [], total = 0 } = data
    return (
      <>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>星标问卷</Title>
          </div>
          <div className={styles.right}>
            <ListSearch />
          </div>
        </div>
        <div className={styles.content}>
          {loading && (
            <div style={{ textAlign: "center" }}>
              <Spin />
            </div>
          )}
          {!loading && list.length === 0 && <Empty description="暂无星标问卷" />}
          {list.length > 0 &&
            list.map((ques) => {
              const { _id } = ques;
              return <QuestionCard key={_id} {...ques} />;
            })}
        </div>
        <div className={styles.footer}>
          <ListPage total={total} />
        </div>
      </>
    );
})



export default Star