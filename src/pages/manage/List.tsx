import React, { memo, FC, useState } from 'react'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard.tsx'
import styles from './Common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { Typography } from 'antd'

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
      isStar: false,
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
    {
      _id: "q4",
      title: "问卷4",
      isPublished: false,
      isStar: true,
      answerCount: 3,
      createdAt: "3月21日 13:25",
    },
  ]

const List: FC = memo(function List() {
  useTitle('问卷-我的问卷')

  const {Title} = Typography

  const [searchParams] = useSearchParams()
  console.log('keyword',searchParams.get('keyword'));
  
    const [questionList, setQuestionList] = useState(rawQuestionList);
    return (
      <>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>我的问卷</Title>
          </div>
          <div className={styles.right}>搜索</div>
        </div>
        <div className={styles.content}>
          {questionList.length &&
            questionList.map((ques) => {
              const { _id } = ques;
              return <QuestionCard key={_id} {...ques} />;
            })}
        </div>
        <div className={styles.footer}>上划加载更多</div>
      </>
    );
})



export default List