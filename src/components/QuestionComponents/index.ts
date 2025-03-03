import { FC } from "react";
import QuestionInputConf,{ QuestionInputPropsType } from "./QuestionInput/index.ts";
import QuestionTitleConf,{ QuestionTitlePropsType } from "./QuestionTitle/index.ts";
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph/index.ts'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo/index.ts'  
import QuestionTextareaConf,{ QuestionTextareaPropsType } from "./QuestionTextarea/index.ts";

// 统一， 各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType & QuestionParagraphPropsType & QuestionInfoPropsType & QuestionTextareaPropsType;

// 统一，组件的配置
export type ComponentConfType = {
    title: string,
    type: string,
    Component: FC<ComponentPropsType>,
    PropComponent: FC<ComponentPropsType>,
    defaultProps: ComponentPropsType
}

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf,QuestionTitleConf,QuestionParagraphConf,QuestionInfoConf, QuestionTextareaConf]

// 组件分组
export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf]
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf, QuestionTextareaConf]
    },
]

export function getComponentConfByType(type: string) {
    return componentConfList.find(conf => conf.type === type)
}