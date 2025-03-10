import { Tooltip } from 'antd'
import React, { memo, FC } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { QuestionCheckboxStatPropsType } from './interface'

const StatComponent: FC<QuestionCheckboxStatPropsType> = memo(function StatComponent(props: QuestionCheckboxStatPropsType) {
    const { stat } = props
    return (
        <div style={{ width: '400px', height: '300px'}}>
            <ResponsiveContainer width='100%' height="100%">
                <BarChart
                width={400}
                height={300}
                data={stat}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                    <CartesianGrid strokeDasharray={'3 3'}/>
                    <XAxis dataKey='name'/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey='count' fill='#8884d8'/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
})



export default StatComponent