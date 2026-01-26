'use client';
import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Space, Table, Form, Popconfirm, Input, Modal } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import AdminSidebar from '@/app/components/layout/AdminSidebar';
import AdminHeader from '@/app/components/layout/AdminHeader';
import AdminFooter from '@/app/components/layout/AdminFooter';
import type { ColumnsType } from 'antd/es/table';
import "./admin.css";

const UserPage = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm<User>();

  // ➕ Thêm
  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setOpen(true);
  };

  // Lưu (thêm hoặc sửa)
  const handleOk = async () => {
    const values = await form.validateFields();

    // Kiểm tra trùng ID khi THÊM
    if (!editingUser) {
      const exists = data.some(item => item.id === values.id);
      if (exists) {
        form.setFields([
          {
            name: 'id',
            errors: ['ID đã tồn tại'],
          },
        ]);
        return;
      }
    }

    if (editingUser) {
      setData(data.map(item =>
        item.id === editingUser.id ? values : item
      ));
    } else {
      setData([...data, values]);
    }

    setOpen(false);
  };

  // ✏️ Sửa
  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setOpen(true);
  };

  // 🗑 Xoá
  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
  };

  interface User {
    id: number;
    name: string;
    address: string;
  }

  const [data, setData] = useState<User[]>([
    { id: 1, name: 'Nguyễn Văn A', address: 'Hà Nội' },
    { id: 2, name: 'Trần Thị B', address: 'TP.HCM' },
  ]);

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 120,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xoá người dùng?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link">
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
          <Button type="primary" className="add-btn">
            + Thêm người dùng
          </Button>


          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            bordered
            className="custom-table"
          />

          <Modal
            title={editingUser ? 'Sửa người dùng' : 'Thêm người dùng'}
            open={open}
            onOk={handleOk}
            onCancel={() => setOpen(false)}
            okText="Lưu"
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="id"
                label="ID"
                rules={[
                  { required: true, message: 'Nhập ID' },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="name"
                label="Tên"
                rules={[{ required: true, message: 'Nhập tên' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Nhập địa chỉ' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>

  );
};

export default UserPage;