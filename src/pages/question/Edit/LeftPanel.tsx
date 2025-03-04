import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { memo, FC } from 'react'
import ComponentLib from './ComponentLib.tsx'
import Layers from './Layers.tsx'

const LeftPanel: FC = memo(function LeftPanel() {
    const tabsItem = [
        {
            key: 'componentLib',
            label: (
                <span>
                    <AppstoreOutlined/>
                    组件库
                </span>
            ),
            children: <ComponentLib/>
        },
        {
            key: 'layers',
            label: (
                <span>
                    <BarsOutlined/>
                    图层
                </span>
            ),
            children: <Layers/>
        }
    ]
    return (
        <Tabs defaultActiveKey='componentLib' items={tabsItem}/>
    )
})



export default LeftPanel