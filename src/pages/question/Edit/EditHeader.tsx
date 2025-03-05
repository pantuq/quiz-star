import React, { memo, FC, useState, ChangeEvent } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, message, Space, Typography } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar.tsx'
import useGetPageInfo from '../../../hooks/useGetPageInfo.ts'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer.tsx'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../services/question.ts'
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

// 保存按钮
const SaveButton: FC = memo(function SaveButton(){
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetCompoentsInfo()
  const { id } = useParams()

  const { loading, run: save } = useRequest(async () => {
    if(id){
      await updateQuestionService(id, { ...pageInfo, componentList })
    }
  },{
    manual: true
  })

  // 快捷键
  useKeyPress(['ctrl.s','meta.s'],(event: KeyboardEvent) => {
    event.preventDefault()
    if(!loading) save()
  })

  // 自动保存
  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  );

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
})

// 发布按钮
const PublishButton: FC = memo(function PublishButton(){
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetCompoentsInfo()
  const { id } = useParams()
  const nav = useNavigate()

  const { loading, run: pub } = useRequest(
    async () => {
      if (id) {
        await updateQuestionService(id, {
          ...pageInfo,
          componentList,
          isPublished: true,
        });
      }
    },
    {
      manual: true,
      onSuccess(){
        message.success('发布成功')
        nav(`/question/stat/${id}`)   //发布成功，跳转到统计页
      }
    }
  );

  return (
    <Button type='primary' onClick={pub} disabled={loading}>发布</Button>
  )
  // 假删除： isDeleted = true (更新)
  // 发布：isPublished = true (更新)
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
                <SaveButton/>
                <PublishButton/>
            </Space>
          </div>
        </div>
      </div>
    );
})



export default EditHeader