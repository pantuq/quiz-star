import React, { memo, FC } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import classNames from 'classnames'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'
import { changeSelectedId, ComponentInfoType } from '../../../store/componentsReducer/index.ts'
import { getComponentConfByType } from '../../../components/QuestionComponents/index.ts'
import { useDispatch } from 'react-redux'

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
    return (
        <div className={styles.canvas}>
            {componentList.map(c => {
                const { fe_id } = c 

                // 拼接classname
                const wrapperDefaultClassName = styles['component-wrapper']
                const selectedClassName = styles.selected
                const wrapperClassName = classNames({
                    [wrapperDefaultClassName]: true,
                    [selectedClassName]: selectedId === fe_id
                })
                return (
                    <div key={fe_id} className={wrapperClassName} onClick={e => handlerClick(e,fe_id)}>
                        <div className={styles.component}>
                            {genComponent(c)}
                        </div>
                    </div>
                )
            })}
            {/* <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionTitle/>
                </div>
            </div>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionInput/>
                </div>
            </div> */}
        </div>
    )
})



export default EditCanvas