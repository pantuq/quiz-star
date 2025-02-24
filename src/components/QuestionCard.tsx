import React, { memo, FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { updateQuestionService } from '../services/question.ts'

type PropsType = {
  _id: string,
  title: string,
  isStar: boolean,
  isPublished: boolean,
  answerCount: number,
  createdAt: string
}

const QuestionCard: FC<PropsType> = memo(function QuestionCard(props: PropsType) {
  const {_id, title, createdAt, answerCount, isPublished, isStar} = props

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar)    //用isStar初始化
  const {loading: changeStarLoading, run: changeStar} = useRequest(async () => {
    await updateQuestionService(_id, { isStar: !isStarState})   //点击触发函数，将isStar取反 服务端层面
  },{
    manual: true,
    onSuccess(){
      setIsStarState(!isStarState)    //点击触发函数，将isStar取反 客户端层面
      message.success(`${isStarState ? '取消' : ''}标星成功`)
    }
  })

  const nav = useNavigate()

  const {confirm} = Modal

  function duplicate() {
    message.success('复制成功')
  }

  function del(){
    confirm({
      title: '确定要删除吗？',
      content: '删除后不可恢复',
      icon: <ExclamationCircleOutlined/>,
      onOk: () => message.success('删除成功')
    })
  }
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`
              }
            >
              <Space>
                {isStarState && <StarOutlined style={{ color: "#1677ff" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}

              <span>答卷: {answerCount}</span>

              <span>创建时间: {createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button type="text" icon={<StarOutlined />} size="small" onClick={changeStar}>
                {isStarState ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确定复制该问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
              >
                <Button type="text" icon={<CopyOutlined />} size="small">
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={del}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    );
})



export default QuestionCard