import React, { memo, FC } from 'react'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'
import { getComponentConfByType } from '../../../components/QuestionComponents/index.ts'

const NoProp: FC = memo(function NoProp(){
    return (
        <div style={{ textAlign: 'center'}}>未选中组件</div>
    )
})

const ComponentProp: FC = memo(function ComponentProp() {
    const { selelctedComponent } = useGetCompoentsInfo()
    if(!selelctedComponent){
        return <NoProp/>
    }

    const { type, props } = selelctedComponent
    const componentConf = getComponentConfByType(type)
    if(!componentConf) return <NoProp/>

    const { PropComponent } = componentConf
    return (
        <PropComponent {...props}/>
    )
})



export default ComponentProp