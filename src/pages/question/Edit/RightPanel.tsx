import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { memo, FC } from 'react'
import ComponentProp from './ComponentProp.tsx'

const RightPanel: FC = memo(function RightPanel() {
    const tabItems = [
        {
            key: 'prop',
            label: (
                <span>
                    <FileTextOutlined/>
                    属性
                </span>
            ),
            children: <ComponentProp/>
        },
        {
            key: 'setting',
            label: (
                <span>
                    <SettingOutlined/>
                    页面设置
                </span>
            ),
            children: <div>页面设置</div>
        }
    ]
    return (
        <Tabs defaultActiveKey='prop' items={tabItems}></Tabs>
    )
})



export default RightPanel