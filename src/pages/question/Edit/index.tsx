import React, { memo, FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas.tsx'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer/index.ts'
import LeftPanel from './LeftPanel.tsx'
import RightPanel from './RightPanel.tsx'
import EditHeader from './EditHeader.tsx'
import useGetPageInfo from '../../../hooks/useGetPageInfo.ts'
import { useTitle } from 'ahooks'

const Edit: FC = memo(function Edit() {
    const { loading } = useLoadQuestionData()
    const dispatch = useDispatch()
    const { title } = useGetPageInfo()
    
    function clearSelectedId(){
        dispatch(changeSelectedId(''))
    }
    
    // 修改标题
    useTitle(`问卷编辑 - ${title}`)
    return (
        <div className={styles.container}>
            <EditHeader/>
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
                    <div className={styles.right}>
                        <RightPanel/>
                    </div>
                </div>
            </div>
        </div>
    )
})



export default Edit