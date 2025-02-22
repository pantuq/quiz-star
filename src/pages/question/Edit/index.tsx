import React, { memo, FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../../../services/question.ts'

const Edit: FC = memo(function Edit() {
    const {id = ''} = useParams() 

    useEffect(() => {
        async function fn() {
            const data = await getQuestionService(id)
            console.log('edit data',data);
        }
        fn()
    },[])
    return (
        <>
            Edit {id}
        </>
    )
})



export default Edit