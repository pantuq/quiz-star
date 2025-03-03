import React, { memo, FC } from 'react'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface.ts'
import { Radio, Space, Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionRadioPropsType> = memo(function Component(props: QuestionRadioPropsType) {
    const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props}
    return (
        <div>
            <Paragraph>{title}</Paragraph>
            <Radio.Group value={value}>
                <Space direction={ isVertical ? 'vertical' : 'horizontal'}>
                    {
                        options.map(opt => {
                            const { value, text } = opt
                            return (
                                <Radio key={value} value={value}>
                                    {text}
                                </Radio>
                            )
                        })
                    }
                </Space>
            </Radio.Group>
        </div>
    )
})



export default Component