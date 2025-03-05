import React, { memo, FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo.ts'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer.tsx'

const { TextArea } = Input

const PageSetting: FC = memo(function PageSetting() {
    const pageInfo = useGetPageInfo()
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    // 实时更新表单
    useEffect(() => {
        form.setFieldsValue(pageInfo)
    },[pageInfo])

    function handleValuesChange(){
        dispatch(resetPageInfo(form.getFieldsValue()))
    }
    return (
      <Form
        layout="vertical"
        initialValues={pageInfo}
        onValuesChange={handleValuesChange}
        form={form}
      >
        <Form.Item label='问卷标题' name='title' rules={[{ required: true, message: '问卷标题不能为空'}]}>
            <Input placeholder='请输入标题'/>
        </Form.Item>

        <Form.Item label='问卷描述' name='desc'>
            <TextArea/>
        </Form.Item>

        <Form.Item label='样式代码' name='css'>
            <TextArea/>
        </Form.Item>

        <Form.Item label='脚本代码' name='js'>
            <TextArea/>
        </Form.Item>
      </Form>
    );
})



export default PageSetting