import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { ComponentPropsType } from "../../components/QuestionComponents/index.ts";

export type ComponentInfoType = {
    fe_id: string,
    type: string,
    title: string,
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
        })
    }
})

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions

export default componentsSlice.reducer