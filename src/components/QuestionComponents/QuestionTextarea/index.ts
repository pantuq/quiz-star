/**
 * @description 问卷输入框
 */

import Component from './Component.tsx'
import PropComponent from './PropComponent.tsx'
import { QuestionTextareaDefaultProps } from './interface.ts'

export * from './interface.ts'

// TextArea组件的配置
export default {
    title: '输入框',
    type: 'questionTextarea',  //要和后端统一好
    Component,  //画布显示的组件
    PropComponent,  //配置属性的组件
    defaultProps: QuestionTextareaDefaultProps
}