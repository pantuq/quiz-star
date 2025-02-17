import React, { memo, FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard.tsx'
import styles from './List.module.scss'

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
    const [questionList, setQuestionList] = useState(rawQuestionList);
    return (
        <>
        <div className={styles.header}>
            <div className={styles.left}>
                <h3>我的问卷</h3>
            </div>
            <div className={styles.right}>
                搜索
            </div>
        </div>
        <div className={styles.content}>
            {questionList.map(ques => {
                const {_id} = ques
                return <QuestionCard key={_id} {...ques}/>
            })}
        </div>
        <div className={styles.footer}>
            底部
        </div>
        </>
    )
})



export default List