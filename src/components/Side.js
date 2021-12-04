import React from 'react'
import { Layout, Menu, } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
export default function Side({ props }) {
    const selectedKeys = props.location.pathname;
    const arrSplit = selectedKeys.split("/");
    let defaultOpenKeys;
    if (arrSplit[2]) {
        defaultOpenKeys = arrSplit[2]
    } else {
        defaultOpenKeys = arrSplit[1]
    }


    return (
        <Sider
            breakpoint="md"
            trigger={false}
        >
            <div style={{ height: "32px", margin: "16px", background: "rgba(255, 255, 255, 0.3)", textAlign: "left", padding: "5px 0 0 5px", color: "grey" }} >Logo</div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[defaultOpenKeys]}
            >
                <Menu.Item key="dashboard">
                    <Link to={`dashboard`}>
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
            </Menu>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[defaultOpenKeys]}
            >
            </Menu>
        </Sider>
    )
}
