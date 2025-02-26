import React, { memo, FC } from 'react'
import styles from './EditCanvas.module.scss'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component.tsx'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component.tsx'
import { Spin } from 'antd'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'
import { ComponentInfoType } from '../../../store/componentsReducer/index.ts'
import { getComponentConfByType } from '../../../components/QuestionComponents/index.ts'

type PropsType = {
    loading: boolean
}

function genComponent(componentInfo: ComponentInfoType){
    const { type, props } = componentInfo

    const componentConf = getComponentConfByType(type)
    if(!componentConf) return null
    
    const { Component } = componentConf
    return <Component {...props}/>
}

const EditCanvas: FC<PropsType> = memo(function EditCanvas(props: PropsType) {
    const { componentList } = useGetCompoentsInfo()
    console.log('componentList',componentList);
    
    if(props.loading){
        return <div style={{ textAlign: 'center', marginTop: '24px'}}>
            <Spin/>
        </div>
    }
    return (
        <div className={styles.canvas}>
            {componentList.map(c => {
                const { fe_id } = c 
                return (
                    <div key={fe_id} className={styles['component-wrapper']}>
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