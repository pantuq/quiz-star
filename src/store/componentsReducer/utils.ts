import { ComponentInfoType, ComponentsStateType } from "./index.ts";

/**
 * 获取下一个selectedId
 * @param fe_id 当前的id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]){
    const visibleComponentList = componentList.filter(c => !c.isHidden)
    const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
    if(index < 0) return ''

    // 重新计算selectedId
    let newSelectedId = ''
    const length = visibleComponentList.length
    if(length <= 1){
        // 组件长度就一个，被删除了就没有组件了
        newSelectedId = ''
    }else{
        // 组件长度 > 1
        if(index + 1 === length){
            // 如果要删除的是最后一个组件，那就选上一个
            newSelectedId = visibleComponentList[index - 1].fe_id
        }else{
            // 要删除的不是最后一个组件，就选中下一个
            newSelectedId = visibleComponentList[index + 1].fe_id
        }
    }
    return newSelectedId
}

/**
 * 插入新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType){
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
}