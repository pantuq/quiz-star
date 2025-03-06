import { BlockOutlined, CopyOutlined, DeleteOutlined, DownOutlined, EyeInvisibleOutlined, LockOutlined, RedoOutlined, UndoOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { memo, FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, copySelectedComponent, moveComponent, pasteCopiedComponent, removeSelectedComponent, toggleComponentLocked } from '../../../store/componentsReducer/index.ts'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'
import { ActionCreators } from 'redux-undo'

const EditToolbar: FC = memo(function EditToolbar() {
    const dispatch = useDispatch()
    const { selectedId,componentList,selelctedComponent,copiedComponent } = useGetCompoentsInfo()
    const { isLocked } = selelctedComponent || {}
    const length = componentList.length
    const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
    const isFirst = selectedIndex <= 0
    const isLast = selectedIndex + 1 >= length

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

    function moveUp(){
        if(isFirst) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
    }

    function moveDown(){
        if(isFirst) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
    }

    function undo(){
      dispatch(ActionCreators.undo()) 
    }

    function redo(){
      dispatch(ActionCreators.redo())
    }
    return (
      <Space>
        <Tooltip title="删除">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          ></Button>
        </Tooltip>

        <Tooltip title="隐藏">
          <Button
            shape="circle"
            icon={<EyeInvisibleOutlined />}
            onClick={handleHidden}
          ></Button>
        </Tooltip>

        <Tooltip title="锁定">
          <Button
            shape="circle"
            icon={<LockOutlined />}
            onClick={handleLock}
            type={isLocked ? "primary" : "default"}
          ></Button>
        </Tooltip>

        <Tooltip title="复制">
          <Button
            shape="circle"
            icon={<CopyOutlined />}
            onClick={copy}
          ></Button>
        </Tooltip>

        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={paste}
            disabled={isFirst}
          ></Button>
        </Tooltip>

        <Tooltip title="上移">
          <Button
            shape="circle"
            icon={<UpOutlined />}
            onClick={moveUp}
            disabled={isFirst}
          ></Button>
        </Tooltip>

        <Tooltip title="下移">
          <Button
            shape="circle"
            icon={<DownOutlined />}
            onClick={moveDown}
            disabled={isLast}
          ></Button>
        </Tooltip>

        <Tooltip title="撤销">
          <Button
            shape="circle"
            icon={<UndoOutlined />}
            onClick={undo}
          ></Button>
        </Tooltip>

        <Tooltip title="重做">
          <Button
            shape="circle"
            icon={<RedoOutlined />}
            onClick={redo}
          ></Button>
        </Tooltip>
      </Space>
    );
})



export default EditToolbar