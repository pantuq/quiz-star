import React, { FC, memo, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'
import { getComponentConfByType } from '../../../components/QuestionComponents/index.ts'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer/index.ts'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress.ts'
import SortableContainer from '../../../components/DragSortable/SortableContainer.tsx'
import SortableItem from '../../../components/DragSortable/SortableItem.tsx'
import styles from './EditCanvas.module.scss'

type PropsType = {
    loading: boolean
}

function genComponent(componentInfo: ComponentInfoType){
    const { type, props } = componentInfo   //每个组件的信息是从redux store中获取的

    const componentConf = getComponentConfByType(type)
    if(!componentConf) return null
    
    const { Component } = componentConf
    return <Component {...props}/>
}

const EditCanvas: FC<PropsType> = memo(function EditCanvas(props: PropsType) {
    // 绑定快捷键
    useBindCanvasKeyPress()
    const { componentList,selectedId} = useGetCompoentsInfo()
    const dispatch = useDispatch()  

    function handlerClick(event:React.MouseEvent,id: string){
        event.stopPropagation() //阻止冒泡，点击main的边框会清空selectedId
        dispatch(changeSelectedId(id))
    }
    
    if(props.loading){
        return <div style={{ textAlign: 'center', marginTop: '24px'}}>
            <Spin/>
        </div>
    }

    // SortableContainer 组件的 items 属性，需要每个 item 都有 id
    const componentListWithId = componentList.map(c => {
        return { ...c, id: c.fe_id }
    })

    // 拖拽排序结束
    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(moveComponent({ oldIndex, newIndex }))
    }

    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        <div className={styles.canvas}>
            {componentList
            .filter(c => !c.isHidden)
            .map(c => {
                const { fe_id, isLocked } = c

                // 拼接 class name
                const wrapperDefaultClassName = styles['component-wrapper']
                const selectedClassName = styles.selected
                const lockedClassName = styles.locked
                const wrapperClassName = classNames({
                [wrapperDefaultClassName]: true,
                [selectedClassName]: fe_id === selectedId,
                [lockedClassName]: isLocked,
                })

                return (
                <SortableItem key={fe_id} id={fe_id}>
                    <div className={wrapperClassName} onClick={e => handlerClick(e, fe_id)}>
                    <div className={styles.component}>{genComponent(c)}</div>
                    </div>
                </SortableItem>
                )
            })}
            {/* <div className={styles['component-wrapper']}>
            <div className={styles.component}>
            <QuestionTitle />
            </div>
        </div>
        <div className={styles['component-wrapper']}>
            <div className={styles.component}>
            <QuestionInput />
            </div>
        </div> */}
        </div>
        </SortableContainer>
    )
})



export default EditCanvas