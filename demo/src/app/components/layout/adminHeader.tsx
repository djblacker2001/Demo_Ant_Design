'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

const AdminHeader = () => {
    const [username, setUsername] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUsername(user.username);
        }
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const items: MenuProps['items'] = [
        {
            key: 'username',
            label: <strong>{username}</strong>,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    return (
        <Header
            style={{
                background: '#fff',
                padding: '0 16px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            <Dropdown menu={{ items }} placement="bottomRight">
                <Space style={{ cursor: 'pointer' }}>
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ fontWeight: 500 }}>
                        {username || 'Guest'}
                    </span>
                </Space>
            </Dropdown>
        </Header>
    );
};

export default AdminHeader;
