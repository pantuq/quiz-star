import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import React, { memo, FC, useState } from 'react'
import styles from './Common.module.scss'
import QuestionCard from '../../components/QuestionCard.tsx'
import ListSearch from '../../components/ListSearch.tsx'

const rawQuestionList = [
    {
      _id: "q1",
      title: "问卷1",
      isPublished: false,
      isStar: true,
      answerCount: 3,
      createdAt: "3月11日 13:25",
    },
    {
      _id: "q2",
      title: "问卷2",
      isPublished: true,
      isStar: true,
      answerCount: 4,
      createdAt: "3月14日 19:25",
    },
    {
      _id: "q3",
      title: "问卷3",
      isPublished: false,
      isStar: true,
      answerCount: 8,
      createdAt: "3月1日 11:23",
    },
  ]

const Star: FC = memo(function Star() {

    useTitle('问卷-星标问卷')

    const {Title} = Typography

    const [questionList,setQuestionList] = useState(rawQuestionList)
    return (
      <>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>星标问卷</Title>
          </div>
          <div className={styles.right}>
            <ListSearch/>
          </div>
        </div>
        <div className={styles.content}>
            {questionList.length === 0 && <Empty description="暂无星标问卷" />}
          { questionList.length > 0 && questionList.map((ques) => {
              const { _id } = ques;
              return <QuestionCard key={_id} {...ques} />;
            })}
        </div>
        <div className={styles.footer}>上划加载更多</div>
      </>
    );
})



export default Star