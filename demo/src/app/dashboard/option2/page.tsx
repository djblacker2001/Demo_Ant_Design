'use client'

import AdminSidebar from '@/app/components/layout/AdminSidebar';
import AdminFooter from '@/app/components/layout/AdminFooter';
import AdminHeader from '@/app/components/layout/AdminHeader';
import React from 'react';
import { Form, Input, Button, message, Card, Breadcrumb, Layout } from 'antd';

const { TextArea } = Input;

interface FeedbackFormValues {
    name: string;
    email: string;
    content: string;
}

const FeedbackForm: React.FC = () => {
    const [form] = Form.useForm<FeedbackFormValues>();
    const { Header, Content, Footer, Sider } = Layout;

    const onFinish = (values: FeedbackFormValues) => {
        console.log('Feedback:', values);

        // TODO: call API here
        message.success('Gửi ý kiến thành công!');
        form.resetFields();
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                    <Card title="Gửi ý kiến" style={{ maxWidth: 500 }}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Họ và tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                            >
                                <Input placeholder="Nhập họ tên" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không hợp lệ' },
                                ]}
                            >
                                <Input placeholder="example@email.com" />
                            </Form.Item>

                            <Form.Item
                                label="Nội dung góp ý"
                                name="content"
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                            >
                                <TextArea rows={4} placeholder="Nhập ý kiến của bạn..." />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Gửi ý kiến
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>

    );
};

export default FeedbackForm;