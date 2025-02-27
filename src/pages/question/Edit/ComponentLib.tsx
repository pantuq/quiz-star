import React, { memo, FC } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents/index.ts'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer/index.ts'
import { nanoid } from '@reduxjs/toolkit'


const ComponentLib: FC = memo(function ComponentLib() {
    const { Title } = Typography
    const dispatch = useDispatch()

    function genComponent(c: ComponentConfType){
        const { title,type, Component, defaultProps } = c
    
        function handleClick(){
            dispatch(addComponent({
                fe_id: nanoid(),
                title,
                type,
                props: defaultProps
            }))
        }
        return <div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
            <Component/>
            </div>
        </div>
    }

    return (
        <>
            {componentConfGroup.map((group,index) => {
                const { groupId, groupName,components} = group
                return (
                    <div key={groupId}>
                        <Title level={3} style={{ fontSize: '20px', marginTop: index > 0 ? '20px' : '0'}}>{groupName}</Title>
                        <div>
                            {components.map(c => genComponent(c))}
                        </div>
                    </div>
                )
            })}
        </>
    )
})



export default ComponentLib