/**
 * @description 问卷 checkbox 组件
 */
import Component from "./Component.tsx";
import PropComponent from "./PropComponent.tsx";
import { QuestionCheckboxDefaultProps } from "./interface.ts";

export * from './interface.ts'

export default {
    title: '多选',
    type: 'questionCheckbox',
    Component,
    PropComponent,
    defaultProps: QuestionCheckboxDefaultProps
}