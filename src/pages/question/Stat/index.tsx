import React, { memo, FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'

const Stat: FC = memo(function Stat() {
    const { loading } = useLoadQuestionData()
    return (
        <div>
            <p>Stat page</p>
            { loading ? <p>loading</p> : <p></p>}
        </div>
    )
})



export default Stat