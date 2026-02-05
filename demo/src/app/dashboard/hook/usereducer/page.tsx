'use client';

import React, { useReducer } from 'react';
import { Breadcrumb, Button, Layout, Space, Table } from 'antd';
import AdminSidebar from '@/app/components/layout/AdminSidebar';
import AdminFooter from '@/app/components/layout/AdminFooter';
import AdminHeader from '@/app/components/layout/AdminHeader';

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    total: number;
};

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'INCREASE_QTY'; id: number }
    | { type: 'DECREASE_QTY'; id: number }
    | { type: 'REMOVE_ITEM'; id: number }
    | { type: 'RESET_CART' };


const initialState: CartState = {
    items: [],
    total: 0,
};


const cartReducer = (
    state: CartState,
    action: CartAction
): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const exist = state.items.find(
                item => item.id === action.payload.id
            );

            let items: CartItem[];

            if (exist) {
                items = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                items = [...state.items, { ...action.payload, quantity: 1 }];
            }

            const total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return { items, total };
        }

        case 'INCREASE_QTY': {
            const items = state.items.map(item =>
                item.id === action.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            const total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return { items, total };
        }

        case 'DECREASE_QTY': {
            const items = state.items
                .map(item =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);

            const total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return { items, total };
        }

        case 'REMOVE_ITEM': {
            const items = state.items.filter(
                item => item.id !== action.id
            );

            const total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return { items, total };
        }

        case 'RESET_CART':
            return initialState;

        default:
            return state;
    }
};


const Parent: React.FC = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                    <div>
                        <h2>Shopping Phone</h2>

                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'ADD_ITEM',
                                    payload: { id: 1, name: 'iPhone', price: 1000, quantity: 1 },
                                })
                            }
                        >
                            Add iPhone
                        </button>

                        {state.items.map(item => (
                            <div key={item.id}>
                                <span>
                                    {item.name} - ${item.price}
                                </span>

                                <button onClick={() => dispatch({ type: 'DECREASE_QTY', id: item.id })}>
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button onClick={() => dispatch({ type: 'INCREASE_QTY', id: item.id })}>
                                    +
                                </button>

                                <button onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}>
                                    Remove
                                </button>
                            </div>
                        ))}

                        <h3>Total: ${state.total}</h3>

                        <button onClick={() => dispatch({ type: 'RESET_CART' })}>
                            Reset Cart
                        </button>
                    </div>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
};

export default Parent;
