import React, { memo, FC, useState, ChangeEvent } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, Space, Typography } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar.tsx'
import useGetPageInfo from '../../../hooks/useGetPageInfo.ts'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer.tsx'
const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = memo(function TitleElem(){
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()

  function handleChange(event: ChangeEvent<HTMLInputElement>){
    const newTitle = event.target.value.trim()
    if(newTitle){
      dispatch(changePageTitle(newTitle))
    }
  }

  if(editState){
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    );
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined/>} type='text' onClick={() => setEditState(true)}/>
    </Space>
  )
})

// 编辑器头部组件
const EditHeader: FC = memo(function EditHeader() {
  const nav = useNavigate()
    return (
      <div className={styles["header-wrapper"]}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Space>
              <Button
                type="link"
                icon={<LeftOutlined />}
                onClick={() => nav(-1)}
              >
                返回
              </Button>
              <TitleElem/>
            </Space>
          </div>
          <div className={styles.main}>
            <EditToolbar/>
          </div>
          <div className={styles.right}>
            <Space>
                <Button>保存</Button>
                <Button type='primary'>发布</Button>
            </Space>
          </div>
        </div>
      </div>
    );
})



export default EditHeader