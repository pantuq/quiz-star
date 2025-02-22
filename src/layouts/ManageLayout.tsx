import React, { memo, FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Divider, Space } from 'antd'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/question.ts'
import { useRequest } from 'ahooks'

const ManageLayout: FC = memo(function ManageLayout() {
    const nav = useNavigate()

    const {pathname} = useLocation()

    // const [loading, setLoading] = useState(false)
    // async function handleCreateClick() {
    //   setLoading(true);
    //   const { id } = await createQuestionService();
    //   if (id) {
    //     nav(`/question/edit/${id}`);
    //     message.success('问卷创建成功');
    //   }
    //   setLoading(false);
    // }

    const { loading, run: handleCreateClick } = useRequest(
      createQuestionService,
      // 因为不需要参数，所以不用想useLoadQuestionData文件里面那样封装
      {
        manual: true,
        onSuccess(result) {
          nav(`/question/edit/${result.id}`);
        },
      }
    );
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateClick}
              disabled={loading}
            >
              新建问卷
            </Button>
            <Divider />
            <Button
              type={pathname.startsWith("/manage/list") ? "default" : "text"}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => nav("/manage/list")}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/star") ? "default" : "text"}
              size="large"
              icon={<StarOutlined />}
              onClick={() => nav("/manage/star")}
            >
              星标问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/trash") ? "default" : "text"}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => nav("/manage/trash")}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    );
})



export default ManageLayout