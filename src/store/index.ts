import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from './useReducer.ts'
import componentsReducer, { ComponentsStateType } from './componentsReducer/index.ts'
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer.tsx";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";

export type StateType = {
    user: UserStateType,
    // components: ComponentsStateType,
    components: StateWithHistory<ComponentsStateType>,  //增加了undo之后的
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: userReducer,
        // 没有undo
        // components: componentsReducer,

        // 增加了undo
        components: undoable(componentsReducer, {
            limit: 20,
            filter: excludeAction([
                'components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent'
            ]),
        }),
        pageInfo: pageInfoReducer
        // 分模块
    }
})