/* eslint-disable no-trailing-spaces */
import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import logo from '../images/cryptocurrency.png'; // ✅ Correct logo path

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  if (!isLoggedIn) return null;

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <img src={logo} alt="logo" className="navbar-logo" />
        <span className="navbar-title">Cryptoverse</span>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100vh', borderRight: '1px solid #ccc' }}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/cryptocurrencies" icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item key="/exchanges" icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item key="/news" icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
        <Menu.Item key="/ask-query" icon={<QuestionCircleOutlined />}>
          <Link to="/ask-query">Ask Query</Link>
        </Menu.Item>
        <Menu.Item key="/dashboard" icon={<UserOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item
          key="/logout"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="logout-item"
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
