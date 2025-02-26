import React, { memo, FC } from 'react'
import styles from './EditCanvas.module.scss'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component.tsx'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component.tsx'
import { Spin } from 'antd'

type PropsType = {
    loading: boolean
}
const EditCanvas: FC<PropsType> = memo(function EditCanvas(props: PropsType) {
    if(props.loading){
        return <div style={{ textAlign: 'center', marginTop: '24px'}}>
            <Spin/>
        </div>
    }
    return (
        <div className={styles.canvas}>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionTitle/>
                </div>
            </div>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionInput/>
                </div>
            </div>
        </div>
    )
})



export default EditCanvas