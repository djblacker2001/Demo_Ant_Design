'use client';
import React, { useState } from 'react';

import { Breadcrumb, Layout, Menu, theme, Button, Space, Table } from 'antd';
import { Solitreo } from 'next/font/google';

import type { TableColumnsType, TableProps } from 'antd';

import AdminFooter from '../components/layout/AdminFooter';
import AdminHeader from '../components/layout/AdminHeader';
import { Content } from 'antd/es/layout/layout';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../components/layout/AdminSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) router.push('/login');
    }, []);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content>{children}</Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
}
