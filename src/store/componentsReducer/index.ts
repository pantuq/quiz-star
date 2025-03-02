import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { ComponentPropsType } from "../../components/QuestionComponents/index.ts";
import { getNextSelectedId } from "./utils.ts";

export type ComponentInfoType = {
    fe_id: string,
    type: string,
    title: string,
    isHidden?:boolean,
    isLocked?:boolean,
    props: ComponentPropsType
}

export type ComponentsStateType = {
    selectedId: string
    componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: []
    // 还有其他扩展
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
        resetComponents:(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            return action.payload
        },
        // 修改selectedId
        changeSelectedId:produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectedId = action.payload
        }),
        // 添加新组件
        addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload

            const { selectedId, componentList } = draft
            const index = componentList.findIndex(c => c.fe_id === selectedId)

            if(index < 0){
                // 没有选中任何组件，将新组件添加在组件列表的末尾
                draft.componentList.push(newComponent)
            } else {
                // 如果选中了某个组件，将新组件添加在选中组件的后面
                draft.componentList.splice(index + 1, 0, newComponent)
            }
            draft.selectedId = newComponent.fe_id
        }),
        // 修改组件属性
        changeComponentProps: produce((draft: ComponentsStateType, action: PayloadAction<{fe_id: string; newProps: ComponentPropsType}>) => {
            const { fe_id, newProps } = action.payload
            
            // 当前要修改的组件
            const curComponent = draft.componentList.find(c => c.fe_id === fe_id)
            if(curComponent){
                curComponent.props = {
                    ...curComponent.props,
                    ...newProps
                }
                // 以防只是修改一部分属性
            }
        }),
        // 删除选中的组件
        removeSelectedComponent: produce((draft: ComponentsStateType) => {
            const { componentList = [], selectedId: removeId } = draft

            // 重新计算selectedId，如果删除了一个组件，那么就选中下一个组件
            const newSelectedId = getNextSelectedId(removeId, componentList)
            draft.selectedId = newSelectedId

            const index = componentList.findIndex(c => c.fe_id === removeId)
            componentList.splice(index, 1)
        }),
        // 隐藏/显示组件
        changeComponentHidden: produce((draft: ComponentsStateType, action: PayloadAction<{fe_id: string; isHidden: boolean}>) => {
            const { componentList = [] } = draft
            const { fe_id, isHidden } = action.payload

            // 重新计算selectedId，如果隐藏了一个组件，那么就选中下一个组件
            let newSelectedId = ''
            if(isHidden){
                // 要隐藏
                newSelectedId = getNextSelectedId(fe_id, componentList)
            }else{
                // 要显示
                newSelectedId = fe_id
            }
            draft.selectedId = newSelectedId

            const curComp = componentList.find(c => c.fe_id === fe_id)
            if(curComp){
                curComp.isHidden = isHidden
            }
        }),
        // 锁定/解锁组件
        toggleComponentLocked: produce((draft: ComponentsStateType, action: PayloadAction<{fe_id: string}>) => {
            const { fe_id } = action.payload
            const curComp = draft.componentList.find(c => c.fe_id === fe_id)
            if(curComp){
                curComp.isLocked = !curComp.isLocked
            }
        })
    }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
} = componentsSlice.actions;

export default componentsSlice.reducer