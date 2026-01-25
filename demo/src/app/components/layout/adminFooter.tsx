'use client'

import { Layout } from "antd";
const AdminFooter = () => {
    const { Header, Content, Footer, Sider } = Layout;
    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Admin ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </>
    )
}

export default AdminFooter