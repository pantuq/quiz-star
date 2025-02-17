import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = memo(function QuestionLayout() {
    return (
        <>
            QuestionLayout
            <div>
                <Outlet />
            </div>
        </>
    )
})



export default QuestionLayout