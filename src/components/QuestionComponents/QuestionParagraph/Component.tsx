import React, { memo, FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface.ts'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = memo(function Component(props: QuestionParagraphPropsType) {
    const { text = '', isCenter = false } = {...QuestionParagraphDefaultProps, ...props}

    const t = text.replaceAll('\n','<br>')
    return (
        <Paragraph style={{ textAlign: isCenter ? 'center': 'start', marginBottom: 0}}>
            <span dangerouslySetInnerHTML={{__html: t}}></span>
        </Paragraph>
    )
})



export default Component