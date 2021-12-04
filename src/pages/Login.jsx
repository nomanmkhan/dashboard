import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Divider, Input, Button, Form, notification } from 'antd';

import './login.css'
function Login(props) {
    notification.config({ duration: 2 });
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(false);

    async function handleLogin() {
        if (email === "") {
            sendNotification('error', {
                title: "Email",
                msg: "Please enter your email address"
            })
            return
        }
        if (password === "") {
            sendNotification('error', {
                title: "Password",
                msg: "Please enter your password"
            })
            return
        }
        let data = {
            email: email.trim(),
            password: password.trim(),
        }
        fetch("http://localhost:4000/api/auth/login", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(async response => {
                setDisable(true);
                let result = await response.json()
                if (response.status === 200) {
                    setDisable(false);
                    document.cookie = `token=${result.token}`;
                    document.cookie = `refreshToken=${result.refreshToken}`;
                    history.push("/dashboard");
                    window.location.reload()
                    sendNotification('success', { title: "Login Successfully", msg: result.data })
                }
                if (response.status !== 200) {
                    sendNotification('error', {
                        title: "Login",
                        msg: result.data
                    })
                    setTimeout(() => { setDisable(false); }, 1500)
                }
            }
            )
            .catch(err => console.log("err", err))
        setEmail(''); setPassword('')
    }

    const sendNotification = (type, data) => {
        notification[type]({
            message: data.title,
            description: data.msg,
        });
    };


    return (
        <div className="container">
            <div className="form">
                <div className="formHeading">
                    <h3>Login</h3>
                    <p>Please login with your details</p>
                </div>
                <Divider />
                <Form autoComplete="off"
                    initialValues={{ remember: true }}

                >
                    <div className="formBody">
                        <p>Email</p>
                        <Form.Item
                            rules={[
                                {
                                    type: "email",
                                    message: "Please enter valid email",
                                },
                                {
                                    required: true,
                                    message: "Email is required",
                                }
                            ]}
                        >
                            <Input className="inputs" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                        </Form.Item>
                        <p style={{ paddingTop: "2px" }} >Password</p>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password",
                                },
                            ]}
                        >
                            <Input className="inputs" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={disable} onClick={handleLogin} >Login</Button>
                        <span style={{ textAlign: "right", paddingTop: "15px", fontSize: "12px", }}>Don't have an account? <Link style={{ color: "#1890ff" }} to="/signup">Register here</Link> </span>
                    </div>
                </Form>
            </div >
        </div >
    );
}

export default Login;

