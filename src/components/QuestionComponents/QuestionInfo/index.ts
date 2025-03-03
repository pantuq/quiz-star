/**
 * @description 问卷 info 组件
 */
import Component from "./Component.tsx";
import PropComponent from "./PropComponent.tsx";
import { QuestionInfoDefaultProps } from "./interface.ts";

export * from './interface.ts'

export default {
    title: '问卷信息',
    type: 'questionInfo',
    Component,
    PropComponent,
    defaultProps: QuestionInfoDefaultProps
}