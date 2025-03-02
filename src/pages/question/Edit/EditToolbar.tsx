import { BlockOutlined, CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { memo, FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, copySelectedComponent, pasteCopiedComponent, removeSelectedComponent, toggleComponentLocked } from '../../../store/componentsReducer/index.ts'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'

const EditToolbar: FC = memo(function EditToolbar() {
    const dispatch = useDispatch()
    const { selectedId,selelctedComponent,copiedComponent } = useGetCompoentsInfo()
    const { isLocked } = selelctedComponent || {}

    function handleDelete(){
        dispatch(removeSelectedComponent())
    }

    function handleHidden(){
        dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
    }

    function handleLock(){
        dispatch(toggleComponentLocked({ fe_id: selectedId}))
    }

    function copy(){
        dispatch(copySelectedComponent())
    }

    function paste(){
        dispatch(pasteCopiedComponent())
    }
    return (
        <Space>
            <Tooltip title='删除'>
                <Button shape='circle' icon={<DeleteOutlined/>} onClick={handleDelete}></Button>
            </Tooltip>

            <Tooltip title='隐藏'>
                <Button shape='circle' icon={<EyeInvisibleOutlined/>} onClick={handleHidden}></Button>
            </Tooltip>

            <Tooltip title='锁定'>
                <Button shape='circle' icon={<LockOutlined/>} onClick={handleLock} type={ isLocked ? 'primary' : 'default'}></Button>
            </Tooltip>

            <Tooltip title='复制'>
                <Button shape='circle' icon={<CopyOutlined/>} onClick={copy}></Button>
            </Tooltip>

            <Tooltip title='粘贴'>
                <Button shape='circle' icon={<BlockOutlined/>} onClick={paste} disabled={copiedComponent === null}></Button>
            </Tooltip>
        </Space>
    )
})



export default EditToolbar