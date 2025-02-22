import React, { memo, FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'

const Edit: FC = memo(function Edit() {
    const { loading, questionData } = useLoadQuestionData()
    return (
        <div>
            <p>Edit page</p>
            { loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p> }
        </div>
    )
})



export default Edit