/**
 * @description 问卷 标题
 */

import Component from './Component.tsx'
import { QuestionTitleDefaultProps } from './interface.ts'

export * from './interface.ts'

// Title组件的配置
export default {
    title: '标题',
    type: 'questionTitle',  //要和后端统一好
    Component,
    defaultProps: QuestionTitleDefaultProps
}