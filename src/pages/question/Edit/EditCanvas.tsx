import React, { memo, FC } from 'react'
import styles from './EditCanvas.module.scss'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component.tsx'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component.tsx'

const EditCanvas: FC = memo(function EditCanvas() {
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