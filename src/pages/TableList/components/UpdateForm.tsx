import { ModalForm, ProFormText } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useState } from 'react';
import { Form } from 'antd';
import RichTextEditor from '@/components/RichTextEditor';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.BackupVO>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.BackupVO>;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [curContent, setCurContent] = useState(props.values.content);
  console.log(props.values, 'props.values');
  return (
    <ModalForm
      modalProps={{
        onCancel: () => props.onCancel(),
      }}
      initialValues={{
        id: props.values.id,
        title: props.values.title,
        content: curContent,
        contentType: props.values.contentType,
        priority: props.values.priority,
      }}
      onFinish={(values) => {
        return props.onSubmit({
          ...values,
          content: curContent
        });
      }}
      open={props.updateModalOpen}
    >
      <ProFormText name="id" label={'id'} width="md" hidden={true} />
      <ProFormText
        name="title"
        label={'标题'}
        width="md"
        rules={[
          {
            required: true,
            message: '请输入标题！',
          },
        ]}
      />
      <Form.Item name="content" label="内容">
        <div style={{ border: '1px solid #d9d9d9', borderRadius: '10px', padding: '8px' }}>
          <RichTextEditor onChange={setCurContent} value={props.values.content}></RichTextEditor>
        </div>
      </Form.Item>
      {/*<ProFormText*/}
      {/*  name="content"*/}
      {/*  label={'内容'}*/}
      {/*  width="md"*/}
      {/*  rules={[*/}
      {/*    {*/}
      {/*      required: true,*/}
      {/*      message: '请输入标题！',*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
      <ProFormText
        name="contentType"
        label={'内容格式'}
        width="md"
        rules={[
          {
            required: true,
            message: '请输入标题！',
          },
        ]}
      />
      <ProFormText
        name="priority"
        label={'优先级'}
        width="md"
        rules={[
          {
            required: true,
            message: '请输入标题！',
          },
        ]}
      />
    </ModalForm>
  );
};
export default UpdateForm;
