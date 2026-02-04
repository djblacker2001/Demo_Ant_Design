'use client';

import React, { useReducer } from 'react';
import { Breadcrumb, Button, Layout, Space, Table } from 'antd';
import AdminSidebar from '@/app/components/layout/AdminSidebar';
import AdminFooter from '@/app/components/layout/AdminFooter';
import AdminHeader from '@/app/components/layout/AdminHeader';

type Player = {
    id: number;
    score: number;
    name: string;
};

type Action = {
    type: 'INCREASE';
    id: number;
};

const initialScore: Player[] = [
    {
        id: 1,
        score: 0,
        name: 'John',
    },
    {
        id: 2,
        score: 0,
        name: 'Sally',
    },
];

const reducer = (state: Player[], action: Action): Player[] => {
    switch (action.type) {
        case 'INCREASE':
            return state.map(player =>
                player.id === action.id
                    ? { ...player, score: player.score + 1 }
                    : player
            );
        default:
            return state;
    }
};

const Parent: React.FC = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const [score, dispatch] = useReducer(reducer, initialScore);

    const handleIncrease = (player: Player) => {
        dispatch({ type: 'INCREASE', id: player.id });
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                    {score.map(player => (
                        <div key={player.id}>
                            <label>
                                <input
                                    type="button"
                                    value={player.name}
                                    onClick={() => handleIncrease(player)}
                                />
                                {player.score}
                            </label>
                        </div>
                    ))}
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
};

export default Parent;
