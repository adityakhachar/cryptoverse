/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import millify from 'millify';
import { Row, Col, Typography, Avatar } from 'antd';
import Loader from './Loader';

const { Text } = Typography;

const Exchanges = () => {
  const [exchangesList, setExchangesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/exchanges'
        );
        setExchangesList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exchange data:', error);
        setIsLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <Row gutter={[16, 16]}>
        {exchangesList.map((exchange) => (
          <Col span={8} key={exchange.id}>
            <div
              style={{
                textAlign: 'center',
                padding: '10px',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {}
              <a
                href={exchange.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar
                  size={64}
                  src={exchange.image}
                  alt={exchange.name}
                  style={{ marginBottom: '10px' }}
                />
              </a>
              <Text style={{ fontWeight: 'bold', display: 'block' }}>
                {exchange.name}
              </Text>
              <Text>
                Volume: ${millify(exchange.trade_volume_24h_btc || 0)}
              </Text>

              <br />
              <Text>Trust Score: {millify(exchange.trust_score || 0)}</Text>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
