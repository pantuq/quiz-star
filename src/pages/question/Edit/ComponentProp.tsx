import React, { memo, FC } from 'react'
import useGetCompoentsInfo from '../../../hooks/useGetComponentsInfo.ts'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents/index.ts'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer/index.ts'

const NoProp: FC = memo(function NoProp(){
    return (
        <div style={{ textAlign: 'center'}}>未选中组件</div>
    )
})

const ComponentProp: FC = memo(function ComponentProp() {
    const dispatch = useDispatch()

    const { selelctedComponent } = useGetCompoentsInfo()
    if(!selelctedComponent){
        return <NoProp/>
    }

    const { type, props, isLocked, isHidden } = selelctedComponent
    const componentConf = getComponentConfByType(type)
    if(!componentConf) return <NoProp/>

    function changeProps(newProps: ComponentPropsType){
        if(!selelctedComponent) return 
        const { fe_id } = selelctedComponent
        
        dispatch(changeComponentProps({fe_id, newProps}))
        
    }

    const { PropComponent } = componentConf
    return (
        <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
    )
})



export default ComponentProp