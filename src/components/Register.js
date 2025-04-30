import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      await registerUser(values);
      message.success('Registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      message.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Register
        </Typography.Title>
        <Form onFinish={handleRegister} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder="Enter email" />
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
              Register
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph style={{ textAlign: 'center' }}>
          Already registered? <Link to="/login">Login</Link>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default Register;
