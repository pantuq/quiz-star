/**
 * @description 问卷 单选 组件
 */

import Component from "./Component.tsx";
import PropComponent from "./PropComponent.tsx";
import { QuestionRadioDefaultProps } from "./interface.ts";

export * from './interface.ts'

export default {
    title: '单选',
    type: 'questionRadio',
    Component,
    PropComponent,
    defaultProps: QuestionRadioDefaultProps
}