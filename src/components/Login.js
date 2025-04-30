import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await loginUser(values);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      message.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Login
        </Typography.Title>
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph style={{ textAlign: 'center' }}>
          New user? <Link to="/register">Register</Link>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default Login;
