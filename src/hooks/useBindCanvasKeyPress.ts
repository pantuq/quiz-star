import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { copySelectedComponent, pasteCopiedComponent, removeSelectedComponent } from "../store/componentsReducer/index.ts";

// 判断点击的元素是否有效
function isActiveElementValid(){
    const activeElem = document.activeElement

    if(activeElem === document.body) return true

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
}