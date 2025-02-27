import React, { memo, FC } from 'react'
import { componentConfGroup } from '../../../components/QuestionComponents/index.ts'
import { Typography } from 'antd'

const ComponentLib: FC = memo(function ComponentLib() {
    const { Title } = Typography
    return (
        <>
            {componentConfGroup.map((group,index) => {
                const { groupId, groupName} = group
                return (
                    <div key={groupId}>
                        <Title level={3} style={{ fontSize: '20px', marginTop: index > 0 ? '20px' : '0'}}>{groupName}</Title>
                    </div>
                )
            })}
        </>
    )
})



export default ComponentLib