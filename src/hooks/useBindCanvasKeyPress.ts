import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { copySelectedComponent, pasteCopiedComponent, removeSelectedComponent, selectNextComponent, selectPrevComponent } from "../store/componentsReducer/index.ts";

// 判断点击的元素是否有效
function isActiveElementValid(){
    const activeElem = document.activeElement    

    // 没有增加dnd-kit之前
    // if(activeElem === document.body) return true

    // 增加了dnd-kit之后
    if(activeElem === document.body) return true
    if(activeElem?.matches("div[role='button']")) return true

    return false
}

export default function useBindCanvasKeyPress() {
    const dispatch = useDispatch()

    // 删除组件
    useKeyPress(['backspace','delete'], () => {
        if(!isActiveElementValid()) return
        dispatch(removeSelectedComponent())
    })

    // 复制
    useKeyPress(['ctrl.c','meta.c'],() => {
        if(!isActiveElementValid()) return
        dispatch(copySelectedComponent())
    })

    // 粘贴
    useKeyPress(['ctrl.v','meta.v'],() => {
        if(!isActiveElementValid()) return
        dispatch(pasteCopiedComponent())
    })

    // 选中上一个
    useKeyPress('uparrow',() => {
        if(!isActiveElementValid()) return
        dispatch(selectPrevComponent())
    })

    // 选中下一个
    useKeyPress('downarrow',() => {
        if(!isActiveElementValid()) return
        dispatch(selectNextComponent())
    })
}