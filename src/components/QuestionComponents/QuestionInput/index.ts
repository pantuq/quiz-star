/**
 * @description 问卷输入框
 */

import Component from './Component.tsx'
import { QuestionInputDefaultProps } from './interface.ts'

export * from './interface.ts'

// Input组件的配置
export default {
    title: '输入框',
    type: 'questionInput',  //要和后端统一好
    Component,
    defaultProps: QuestionInputDefaultProps
}