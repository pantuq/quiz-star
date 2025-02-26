import { FC } from "react";
import QuestionInputConf,{ QuestionInputPropsType } from "./QuestionInput/index.ts";
import QuestionTitleConf,{ QuestionTitlePropsType } from "./QuestionTitle/index.ts";

// 统一， 各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;

// 统一，组件的配置
export type ComponentConfType = {
    title: string,
    type: string,
    Component: FC<ComponentPropsType>,
    defaultProps: ComponentPropsType
}

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf,QuestionTitleConf]

export function getComponentConfByType(type: string) {
    return componentConfList.find(conf => conf.type === type)
}