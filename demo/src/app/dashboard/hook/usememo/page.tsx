'use client';

import { useMemo, useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import AdminSidebar from '@/app/components/layout/AdminSidebar';
import AdminFooter from '@/app/components/layout/AdminFooter';
import AdminHeader from '@/app/components/layout/AdminHeader';

type Order = {
    id: number;
    customer: string;
    status: 'pending' | 'completed' | 'cancelled';
    amount: number;
};

const MOCK_ORDERS: Order[] = [
    { id: 1, customer: 'John', status: 'completed', amount: 200 },
    { id: 2, customer: 'Sally', status: 'pending', amount: 150 },
    { id: 3, customer: 'Mike', status: 'cancelled', amount: 300 },
];

export default function OrdersGood() {
    const { Content } = Layout;

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<'all' | Order['status']>('all');
    const [theme, setTheme] = useState('light');

    const orders = MOCK_ORDERS;

    const filteredOrders = useMemo(() => {
        return orders.filter(o => {
            const matchSearch = o.customer
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchStatus = status === 'all' || o.status === status;

            return matchSearch && matchStatus;
        });
    }, [orders, search, status]);

    const totalRevenue = useMemo(() => {
        return filteredOrders.reduce((sum, o) => sum + o.amount, 0);
    }, [filteredOrders]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb
                        style={{ margin: '16px 0' }}
                        items={[{ title: 'User' }, { title: 'Bill' }]}
                    />

                    <input value={search} onChange={e => setSearch(e.target.value)} />

                    <select value={status} onChange={e => setStatus(e.target.value as any)}>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                        Toggle Theme
                    </button>

                    <p>Total revenue: ${totalRevenue}</p>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
}
