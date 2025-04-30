/* eslint-disable no-trailing-spaces */
import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const safeMillify = (value) => {
  try {
    const num = Number(value);
    if (Number.isNaN(num)) return 'N/A';
    if (num > Number.MAX_SAFE_INTEGER) return `${(num / 1e12).toFixed(2)}T+`;
    return millify(num);
  } catch (err) {
    return 'N/A';
  }
};

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  if (isFetching) return <Loader />;

  const globalStats = data?.data?.stats;

  return (
    <>
      <div className="global-stats-container">
        <Title level={2} className="heading">
          Global Crypto Stats
        </Title>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="Total Cryptocurrencies"
              value={safeMillify(globalStats.total)}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="Total Exchanges"
              value={safeMillify(globalStats.totalExchanges)}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="Total Market Cap"
              value={`$${safeMillify(globalStats.totalMarketCap)}`}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="Total 24h Volume"
              value={`$${safeMillify(globalStats.total24hVolume)}`}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Statistic
              title="Total Markets"
              value={safeMillify(globalStats.totalMarkets)}
            />
          </Col>
        </Row>
      </div>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos
        </Title>
        <Title level={3} className="show-more">
          <a href="/cryptocurrencies">Show More</a>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3}>
          <a href="/news">Show More</a>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
