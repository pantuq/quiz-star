import React, { memo, FC } from 'react'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard.tsx'
import styles from './Common.module.scss'
import { Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch.tsx'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData.ts'

const List: FC = memo(function List() {
  useTitle('问卷-我的问卷')

  const {Title} = Typography

  const { data = {}, loading } = useLoadQuestionListData()
  const { list = [], total = 0 } = data

    return (
      <>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>我的问卷</Title>
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
          {(!loading || list.length > 0) &&
            list.map((ques: any) => {
              const { _id } = ques;
              return <QuestionCard key={_id} {...ques} />;
            })}
        </div>
        <div className={styles.footer}>上划加载更多</div>
      </>
    );
})



export default List