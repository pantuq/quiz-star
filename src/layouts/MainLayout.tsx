import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = memo(function MainLayout() {
    return (
        <>
        <div>MainLayout header</div>
        <div>
            <Outlet/>
        </div>
        <div>MainLayout footer</div>
        </>
    )
})



export default MainLayout