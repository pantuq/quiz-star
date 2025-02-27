import React, { memo, FC } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents/index.ts'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'

function genComponent(c: ComponentConfType){
    const { title,type, Component } = c
    return <div className={styles.wrapper}>
        <div className={styles.component}>
        <Component/>
        </div>
    </div>
}

const ComponentLib: FC = memo(function ComponentLib() {
    const { Title } = Typography
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