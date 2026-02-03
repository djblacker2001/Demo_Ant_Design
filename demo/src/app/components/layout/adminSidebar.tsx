'use client';

import React, { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '/dashboard/option1', <PieChartOutlined />),
    getItem('Option 2', '/dashboard/option2', <DesktopOutlined />),

    getItem('User', 'user', <UserOutlined />, [
        getItem('Staff', '/dashboard/staff'),
        getItem('Admin', '/dashboard/admin'),
        getItem('Students', '/dashboard/students'),
    ]),

    getItem('Team', 'team', <TeamOutlined />, [
        getItem('Reander không tối ưu', '/dashboard/team1'),
        getItem('Reander tối ưu', '/dashboard/team2'),
        getItem('Team 3', '/dashboard/team3'),
        getItem('Team 4', '/dashboard/team4'),
    ]),

    getItem('Files', '/dashboard/files', <FileOutlined />),
];

const AdminFooter = () => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="demo-logo-vertical" />

            <Menu
                theme="dark"
                mode="inline"
                items={items}
                selectedKeys={[pathname]}
                onClick={({ key }) => {
                    if (typeof key === 'string' && key.startsWith('/')) {
                        router.push(key);
                    }
                }}
            />
        </Sider>
    );
};

export default AdminFooter;
