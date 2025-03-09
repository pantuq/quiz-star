import { Typography } from 'antd'
import React, { memo, FC } from 'react'

const { Title } = Typography

type PropsType = {
    selectedComponentId: string,
    selectedComponentType: string
}

const ChartStat: FC<PropsType> = memo(function ChartStat(props: PropsType) {
    return (
        <>
            <Title level={3}>图表统计</Title>
            <div>图表</div>
        </>
    )
})



export default ChartStat