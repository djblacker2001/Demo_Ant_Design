'use client';

import React from 'react';
import { Pie } from '@ant-design/plots';
import type { PieConfig } from '@ant-design/plots';
import { Breadcrumb, Button, Layout, Space, Table } from 'antd';
import AdminSidebar from '@/app/components/layout/AdminSidebar';
import AdminFooter from '@/app/components/layout/AdminFooter';
import AdminHeader from '@/app/components/layout/AdminHeader';

interface PieData {
    type: string;
    value: number;
}

const DemoPie: React.FC = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const data: PieData[] = [
        { type: 'Voodoo doll', value: 27 },
        { type: 'Tarot card', value: 25 },
        { type: 'Summoning circle', value: 18 },
        { type: 'Haunted mirror', value: 15 },
        { type: 'Monkey paw', value: 5 },
        { type: 'Music box', value: 5 },
        { type: 'Ouija board', value: 5 },
    ];

    const config: PieConfig = {
        data,
        angleField: 'value',
        colorField: 'type',
        label: {
            text: 'value',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            position: 'inner-top-right',
            color: {
                title: false,
                rowPadding: 5,
            },
        },
    };

    // const config: PieConfig = {
    //     data,
    //     angleField: 'value',
    //     colorField: 'type',

    //     legend: {
    //         position: 'inner-top-right', // ⭐ đưa vào trong
    //     },

    //     label: false,
    // };


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                    <Pie {...config} />;
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );

    //   <Pie {...config} />;
};

export default DemoPie;
