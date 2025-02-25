import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData.ts'
import { Spin } from 'antd'

const QuestionLayout: FC = memo(function QuestionLayout() {
    const { waitingUserData } = useLoadUserData()
    return (
      <>
        QuestionLayout
        <div>
          {waitingUserData ? (
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </>
    );
})



export default QuestionLayout