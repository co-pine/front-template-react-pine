import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  ProForm,
  ProFormDigit,
} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message, Select, Popconfirm, Form} from 'antd';
import React, { useRef, useState } from 'react';
import { contentTypeMap, FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {
  addBackup,
  deleteBackup,
  editBackup,
  listBackupVoByPage,
} from '@/services/backend-template-new-pine/backupController';
import RichTextViewer from '@/components/RichTextViewer';
import RichTextEditor from '@/components/RichTextEditor';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.BackupAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addBackup(fields);
    hide();
    message.success('备忘条添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * @en-US Delete node
 * @zh-CN 删除节点
 * @param id
 */
const handleDelete = async (id: number) => {
  const hide = message.loading('正在删除');
  try {
    await deleteBackup({ id });
    hide();
    message.success('备忘条删除成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    console.log(fields, '....');
    await editBackup({
      ...fields,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.BackupVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteBackup({
      id: selectedRows.map((row) => row.id)[0],
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};
const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [addContent, setAddContent] = useState('');
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [currentRow, setCurrentRow] = useState<API.BackupVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.BackupVO[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.BackupVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: '名称',
      dataIndex: 'title',
      tip: 'The rule name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      render: (dom) => {
        return <RichTextViewer htmlContent={dom as string}></RichTextViewer>;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="modify"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <Popconfirm
          key="confirmDelete"
          title="删除备忘条"
          description="删除后无法恢复，你确定要删除吗？"
          onConfirm={(e) => {
            console.log(e);
            handleDelete(record.id as number);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          okText="确认"
          cancelText="取消"
        >
          <a key="delete">删除</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.BackupVO, API.BackupQueryRequest>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, keyword) => {
          const resp = await listBackupVoByPage({
            ...params,
          });

          return {
            data: resp?.data?.records,
            success: resp?.code === 0,
            total: resp?.data?.total,
          };
        }}
        columns={columns}
      />
      {selectedRowsState?.length > 0 && (
        <>
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </>
      )}
      <ModalForm
        form={form}
        title={'新建备忘条'}
        width="800px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd({ ...value, content: addContent } as API.BackupVO);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            form.resetFields();
          }
        }}
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
        <ProForm.Item name="content" label="内容">
          <div style={{ border: '1px solid #d9d9d9', borderRadius: '10px', padding: '8px' }}>
            <RichTextEditor onChange={setAddContent}></RichTextEditor>
          </div>
        </ProForm.Item>
        <ProForm.Item
          name="contentType"
          label={'内容格式'}
          rules={[
            {
              required: true,
              message: '请输入标题！',
            },
          ]}
        >
          <Select options={contentTypeMap} />
        </ProForm.Item>
        <ProFormDigit
          name="priority"
          label={'优先级'}
          width="md"
          rules={[
            {
              required: true,
              message: '请输入大于 0 的数字！',
            },
          ]}
        />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.title && (
          <ProDescriptions<API.BackupVO>
            column={2}
            title={currentRow?.title}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.title,
            }}
            columns={columns as ProDescriptionsItemProps<API.BackupVO>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
