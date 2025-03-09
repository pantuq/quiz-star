import { FC } from "react";
import QuestionInputConf,{ QuestionInputPropsType } from "./QuestionInput/index.ts";
import QuestionTitleConf,{ QuestionTitlePropsType } from "./QuestionTitle/index.ts";
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph/index.ts'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo/index.ts'  
import QuestionTextareaConf,{ QuestionTextareaPropsType } from "./QuestionTextarea/index.ts";
import QuestionRadioConf, { QuestionRadioPropsType, QuestionRadioStatPropsType } from './QuestionRadio/index.ts' 
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox/index.ts'

// 统一， 各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

//统一各个组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType;

// 统一，组件的配置
export type ComponentConfType = {
    title: string,
    type: string,
    Component: FC<ComponentPropsType>,
    PropComponent: FC<ComponentPropsType>,
    defaultProps: ComponentPropsType,
    StatComponent?: FC<ComponentStatPropsType>
}

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

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
    {
        groupId: 'chooseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf, QuestionCheckboxConf]
    }
]

export function getComponentConfByType(type: string) {
    return componentConfList.find(conf => conf.type === type)
}