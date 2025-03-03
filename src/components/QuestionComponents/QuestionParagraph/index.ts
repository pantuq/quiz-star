/**
 * @description 问卷 - 段落
 */
import Component from "./Component.tsx"
import { QuestionParagraphDefaultProps } from "./interface.ts"
import PropComponent from "./PropComponent.tsx"

export * from './interface.ts'

// Paragraph组件的配置
export default {
    title: '段落',
    type: 'questionParagraph',
    Component,
    PropComponent,
    defaultProps: QuestionParagraphDefaultProps
}