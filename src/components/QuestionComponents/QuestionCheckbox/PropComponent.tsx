import React, { memo, FC } from 'react'
import { QuestionCheckboxPropsType } from './interface.ts'
import { Checkbox, Form, Input } from 'antd'

const PropComponent: FC<QuestionCheckboxPropsType> = memo(function PropComponent(props: QuestionCheckboxPropsType) {
    const { title, isVertical, list = [], onChange, disabled } = props
    const [form] = Form.useForm()

    function handleValueChange(){
        // onChange(form.getFieldsValue())
    }
    return (
      <Form
        layout="vertical"
        form={form}
        initialValues={{ title, isVertical, list }}
        disabled={disabled}
        onValuesChange={handleValueChange}
      >
        <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
            <Input/>
        </Form.Item>

        <Form.Item name="isVertical" valuePropName="checked">
          <Checkbox>竖向排列</Checkbox>
        </Form.Item>
      </Form>
    );
})



export default PropComponent