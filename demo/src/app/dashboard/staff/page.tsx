'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Space, Table, Form, Popconfirm, Input, Modal, Tooltip, InputNumber } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import AdminSidebar from '@/app/components/layout/AdminSidebar';
import AdminHeader from '@/app/components/layout/AdminHeader';
import AdminFooter from '@/app/components/layout/AdminFooter';
import type { ColumnsType } from 'antd/es/table';
import "./staff.css";
import TextArea from 'antd/es/input/TextArea';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface User {
    id: number;
    name: string;
    address: string;
}

const UserPage = () => {
    //Tạo dữ liệu lặp
    // const generateUsers = (count: number): User[] => {
    //   return Array.from({ length: count }, (_, index) => ({
    //     id: index + 1, // ID khác nhau
    //     name: names[index % names.length], // tên có thể trùng
    //     address: addresses[index % addresses.length], // địa chỉ có thể trùng
    //   }));
    // };

    const [data, setData] = useState<User[]>([]);
    const { Header, Content, Footer, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form] = Form.useForm<User>();

    useEffect(() => {
        const saved = localStorage.getItem('users');
        if (saved) {
            setData(JSON.parse(saved));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('app_users', JSON.stringify(data));
    }, [data]);

    // Thêm
    const handleAdd = () => {
        setEditingUser(null);
        form.resetFields();
        setOpen(true);
        console.log("Added");
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

    // Sửa
    const handleEdit = useCallback((record: User) => {
        setEditingUser(record);
        form.setFieldsValue(record);
        setOpen(true);
    }, [form]);

    // Xoá
    const handleDelete = useCallback((id: number) => {
        setData(prev => prev.filter(item => item.id !== id));
    }, []);

    const UserTable = React.memo(
        ({ data, columns }: { data: User[]; columns: ColumnsType<User> }) => {
            console.log('🔄 Table render');
            return (
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    bordered
                    className="custom-table"
                />
            );
        }
    );


    const columns = useMemo<ColumnsType<User>>(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            render: (text: string) => (
                <Tooltip title={text}>{text}</Tooltip>
            ),
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        <EditOutlined /> Sửa
                    </Button>
                    <Popconfirm
                        title="Xoá người dùng?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger type="link">
                            <DeleteOutlined /> Xoá
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ], [handleEdit, handleDelete]);


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                    <Button type="primary" className="add-btn" onClick={handleAdd}>
                        + Thêm người dùng
                    </Button>
                    <UserTable data={data} columns={columns} />
                    <Modal
                        title={editingUser ? 'Sửa người dùng' : 'Thêm người dùng'}
                        open={open}
                        onOk={handleOk}
                        onCancel={() => {
                            setOpen(false);
                            form.resetFields();
                            setEditingUser(null);
                        }}

                        okText="Lưu"
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="id"
                                label="ID"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập ID' },
                                    {
                                        validator: (_, value) => {
                                            if (Number.isInteger(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('ID phải là số nguyên'));
                                        },
                                    },
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    min={1}
                                    precision={0}
                                    placeholder="Nhập ID"
                                />
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
                                <Input.TextArea rows={5} />
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
