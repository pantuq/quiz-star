import React, { memo, FC, useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { QuestionRadioStatPropsType } from './interface.ts';
import { STAT_COLOR } from '../../../constants/index.tsx';

function format(n: number){
    return (n * 100).toFixed(2)
}

const StatComponent: FC<QuestionRadioStatPropsType> = memo(function StatComponent(props: QuestionRadioStatPropsType) {
    // count 总
    const sum = useMemo(() => {
        let s = 0
        props.stat.forEach(i => {
            s += i.count
        })
    },[props.stat])
    return (
      <div style={{ width: "300px", height: "300px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="count"
              data={props.stat}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              label={i => `${i.name}: ${format(i.count / sum)}%`}
            >
                {
                    props.stat.map((i, index) => {
                        return <Cell key={index} fill={STAT_COLOR[index]}/>
                    })
                }
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
})



export default StatComponent