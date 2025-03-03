import React, { memo, FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface.ts'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = memo(function Component(props: QuestionParagraphPropsType) {
    const { text = '', isCenter = false } = {...QuestionParagraphDefaultProps, ...props}

    const textList = text.split('\n')
    return (
        <Paragraph style={{ textAlign: isCenter ? 'center': 'start', marginBottom: 0}}>
            {
                textList.map((t,index) => {
                    return (
                        <span key={index}>{index > 0 && <br/>} {t}</span>
                    )
                })
            }
        </Paragraph>
    )
})



export default Component