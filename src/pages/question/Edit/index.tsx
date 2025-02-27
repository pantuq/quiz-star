import React, { memo, FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas.tsx'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer/index.ts'
import LeftPanel from './LeftPanel.tsx'

const Edit: FC = memo(function Edit() {
    const { loading } = useLoadQuestionData()
    const dispatch = useDispatch()
    
    function clearSelectedId(){
        dispatch(changeSelectedId(''))
    }
    return (
        <div className={styles.container}>
            <div style={{ backgroundColor: '#fff', height: '40px'}}>Header</div>
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel/>
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles['canvas-wrapper']}>
                            <EditCanvas loading={loading}/>
                        </div>
                    </div>
                    <div className={styles.right}>Right</div>
                </div>
            </div>
        </div>
    )
})



export default Edit