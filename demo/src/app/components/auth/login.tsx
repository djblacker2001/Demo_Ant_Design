'use client';

import { loginDemo } from '@/utils/auth';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';


const LoginPage = () => {
  const router = useRouter();

  const onFinish = (values: any) => {
    const user = loginDemo(values.username, values.password);

    if (!user) {
      message.error('Sai tài khoản hoặc mật khẩu');
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    message.success(`Đăng nhập thành công (${user.role})`);
    router.push('/dashboard');
  };

  return (
    <Form onFinish={onFinish} style={{ maxWidth: 300 }}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        Login
      </Button>
    </Form>
  );
};

export default LoginPage;
