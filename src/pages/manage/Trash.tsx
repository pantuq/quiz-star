import { Button, Empty, Modal, Space, Table, Tag, Typography } from 'antd'
import React, { memo, FC, useState } from 'react'
import styles from './Common.module.scss'
import { useTitle } from 'ahooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'

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


const Trash: FC = memo(function Trash() {
    useTitle('问卷-回收站')
    const [questionList,setQuestionList] = useState(rawQuestionList)
    // 记录选中的id
    const [selectIds,setSelectIds] = useState<string[]>([])

    const {Title} = Typography

    const { confirm } = Modal

    function del(){
        confirm({
            title: '确认彻底删除该问卷?',
            icon: <ExclamationCircleOutlined/>,
            content: '删除以后不可以找回',
            onOk: () => alert('删除' + JSON.stringify(selectIds))
        })
    }

    const TableCol = [
      {
        title: "标题",
        dataIndex: "title",
      },
      {
        title: "是否发布",
        dataIndex: "isPublished",
        render: (isPublished: boolean) => {
          return isPublished ? (
            <Tag color="processing">已发布</Tag>
          ) : (
            <Tag>未发布</Tag>
          );
        },
      },
      {
        title: "答卷",
        dataIndex: "answerCount",
      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
      },
    ];

    const TableElem = (<>
        <div style={{marginBottom: '16px'}}>
            <Space>
                <Button type='primary' disabled={!selectIds.length}>恢复</Button>
                <Button danger disabled={!selectIds.length} onClick={del}>彻底删除</Button>
            </Space>
        </div>

        <Table
        dataSource={questionList}
        columns={TableCol}
        pagination={false}
        rowKey={(q => q._id)}
        rowSelection={{
        type: 'checkbox',
        onChange: (selectedRowKeys) => {
            setSelectIds(selectedRowKeys as string[])
        }
        }}
        />
    </>)
    return (
      <>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>星标问卷</Title>
          </div>
          <div className={styles.right}>搜索</div>
        </div>
        <div className={styles.content}>
          {questionList.length === 0 && <Empty description="暂无数据" />}
          {questionList.length > 0 && TableElem }
        </div>
      </>
    );
})



export default Trash