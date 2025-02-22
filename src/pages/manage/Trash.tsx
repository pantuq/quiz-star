import { Button, Empty, Modal, Space, Spin, Table, Tag, Typography } from 'antd'
import React, { memo, FC, useState } from 'react'
import styles from './Common.module.scss'
import { useTitle } from 'ahooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch.tsx'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData.ts'

const Trash: FC = memo(function Trash() {
    useTitle('问卷-回收站')
    const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true })
    const { list = [], total = 0 } = data
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
        dataSource={list}
        columns={TableCol}
        pagination={false}
        rowKey={((q: any) => q._id)}
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
            <Title level={3}>回收站</Title>
          </div>
          <div className={styles.right}>
            <ListSearch/>
          </div>
        </div>
        <div className={styles.content}>
        {loading && (
            <div style={{ textAlign: "center" }}>
              <Spin />
            </div>
          )}
          {!loading && list.length === 0 && <Empty description="暂无数据" />}
          {list.length > 0 && TableElem }
        </div>
      </>
    );
})



export default Trash