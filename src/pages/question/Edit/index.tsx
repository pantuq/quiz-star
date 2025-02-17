import React, { memo, FC } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = memo(function Edit() {
    const {id = ''} = useParams() 
    return (
        <>
            Edit {id}
        </>
    )
})



export default Edit