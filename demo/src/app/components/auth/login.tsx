'use client';

import { loginDemo } from '@/utils/auth';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './login.css';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const onFinish = (values: { username: string; password: string }) => {
    const user = loginDemo(values.username, values.password);

    if (!user) {
      setError('Tên người dùng hoặc mật khẩu không đúng');
      return;
    }

    setError('');
    localStorage.setItem('user', JSON.stringify(user));
    message.success(`Đăng nhập thành công (${user.role})`);
    router.push('/dashboard');
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 300, margin: '100px auto' }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập username' }]}
      >
        <Input placeholder="Nhập username" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>
      {error && <div className="login-error">{error}</div>}

      <Button type="primary" htmlType="submit" block>
        Đăng nhập
      </Button>
    </Form>
  );
};

export default LoginPage;
