import React from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { Layout, Typography, Space, Button } from 'antd';

import {
  Exchanges,
  Homepage,
  News,
  Cryptocurrencies,
  CryptoDetails,
  Navbar,
} from './components';
import Register from './components/Register';
import Login from './components/Login';
import AskQuery from './components/AskQuery';
import Dashboard from './components/Dashboard';

import './App.css';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('access');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="navbar">{isLoggedIn && <Navbar />}</div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              {!isLoggedIn ? (
                <>
                  <Route path="/" element={<Navigate to="/register" />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate to="/register" />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/exchanges" element={<Exchanges />} />
                  <Route
                    path="/cryptocurrencies"
                    element={<Cryptocurrencies />}
                  />
                  <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/ask-query" element={<AskQuery />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/register" element={<Navigate to="/" />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Copyright © 2025 <Link to="/">Cryptoverse Inc.</Link>
            <br />
            All Rights Reserved.
          </Typography.Title>

          {isLoggedIn && (
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
              <Link to="/ask-query">Ask Query</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Button
                type="link"
                onClick={handleLogout}
                style={{ color: '#1890ff', padding: 0 }}
              >
                Logout
              </Button>
            </Space>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
