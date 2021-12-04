import React, { useEffect, useState } from 'react';
import { readCookie } from "../utils/readCookie";
import { Input, Select, Table } from 'antd';
import "./table.css"
function Dashboard(props) {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const [col, setCol] = useState([]);

    useEffect(async () => {
        setLoad(true)
        fetch(`http://localhost:8000/v1/getAll/item?filter=Y`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer my-token",
            },
            body: JSON.stringify({
                user_id: 1,
                session_id: 1
            })
        })
            .then(async (response) => {
                let result = await response.json();
                console.log("file: Dashboard.jsx - line 64 - result", result?.data);
                setCol(Object.keys(result?.data[0]))
                setData(result?.data)
                setLoad(false)
            }).catch(err => setLoad(false));
    }, [])
    const dynamicCol = col && col.map(singleCol => {
        return {
            title: singleCol,
            dataIndex: singleCol,
            key: singleCol,
            width: 100,
        }
    });

    let c = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "nationality", dataIndex: "nationality", key: "nationality" },
        { title: "religion", dataIndex: "religion", key: "religion" },
        { title: "nationality", dataIndex: "nationality", key: "nationality" },
        { title: "religion", dataIndex: "religion", key: "religion" },
        { title: "nationality", dataIndex: "nationality", key: "nationality" },
        { title: "religion", dataIndex: "religion", key: "religion" },
    ]
    // { name: "noman", nationality: "Pakistani", religion: "Islam" }

    let datas = [
        { name: "noman", nationality: "Pakistani", religion: "Islam" },
        { name: "abraham", nationality: "Indian", religion: "jew" },
        { name: "noman", nationality: "Pakistani", religion: "Islam" },
        { name: "abraham", nationality: "Indian", religion: "jew" },
        { name: "noman", nationality: "Pakistani", religion: "Islam" },
        { name: "abraham", nationality: "Indian", religion: "jew" },
        { name: "noman", nationality: "Pakistani", religion: "Islam" },
        { name: "abraham", nationality: "Indian", religion: "jew" },
    ]

    return (
        <div className="App" style={{ padding: "10px", background: "rgb(245 245 245)" }}>
            <h2>Dashboard.</h2>
            <div style={{ height: "70vh", width: "85vw", background:"#fff", }} >
                <Table
                    bordered={true}
                    loading={load}
                    scroll={{ x: "50rem", y: "70vh" }}
                    dataSource={data}
                    columns={dynamicCol}
                    columns={c}
                    rowKey={(record, index) => index}
                    pagination={true}

                />
            </div>
        </div>
    );
}

export default Dashboard;
