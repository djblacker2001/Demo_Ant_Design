'use client';

import React, { useState } from 'react';
import { Breadcrumb, Button, Layout, Space, Table } from 'antd';
import AdminSidebar from '@/app/components/layout/AdminSidebar';
import AdminFooter from '@/app/components/layout/AdminFooter';
import AdminHeader from '@/app/components/layout/AdminHeader';

type ChildProps = {
    title: string;
    onClick: () => void;
};

const Child: React.FC<ChildProps> = ({ title, onClick }) => {
    console.log('❌ Render Child');
    return <button onClick={onClick}>{title}</button>;
};

const DemoPie: React.FC = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const [count, setCount] = useState<number>(0);

    console.log('❌ Render Parent');
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                    <button onClick={() => setCount(count + 1)}>
                        Increase {count}
                    </button>

                    <Child
                        title="Click me"
                        onClick={() => console.log('clicked')} />
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );

    //   <Pie {...config} />;
};

export default DemoPie;
