import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { memo, FC, useState, useEffect } from 'react'
import ComponentProp from './ComponentProp.tsx'
import PageSetting from './PageSetting.tsx'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'

enum TAB_KEYS {
    PROP_KEY = 'prop',
    SETTING_KEY = 'setting'
}

const RightPanel: FC = memo(function RightPanel() {
    const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
    const { selectedId } = useGetCompoentsInfo()

    useEffect(() => {
        if(selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
        else setActiveKey(TAB_KEYS.SETTING_KEY)
    },[selectedId])
    const tabItems = [
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined/>
                    属性
                </span>
            ),
            children: <ComponentProp/>
        },
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined/>
                    页面设置
                </span>
            ),
            children: <PageSetting/>
        }
    ]
    return (
        <Tabs activeKey={activeKey} items={tabItems}></Tabs>
    )
})



export default RightPanel