/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import axios from 'axios';
import Loader from './Loader';

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newsCategory, setNewsCategory] = useState('bitcoin');

  const API_KEY = 'fe223485867e4aaea05c3e08d1acfe53';
  const NEWS_API_URL = 'https://newsapi.org/v2/everything';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(NEWS_API_URL, {
          params: {
            q: newsCategory,
            apiKey: API_KEY,
            language: 'en',
            sortBy: 'publishedAt',
          },
        });

        setNews(response.data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      setIsLoading(false);
    };

    fetchNews();
  }, [newsCategory]);

  if (isLoading) return <Loader />;
  if (news.length === 0) {
    return (
      <div style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
        🚨 No news available. Please try again later.
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {!simplified && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: '250px' }}
          >
            <Option value="bitcoin">Bitcoin</Option>
            <Option value="ethereum">Ethereum</Option>
            <Option value="crypto">Cryptocurrency</Option>
            <Option value="blockchain">Blockchain</Option>
          </Select>
        </div>
      )}

      <Row gutter={[24, 24]} justify="center">
        {news.map((article, i) => (
          <Col
            xs={24}
            sm={12}
            lg={8}
            key={i}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              hoverable
              className="news-card"
              style={{
                width: '100%',
                maxWidth: 350,
                borderRadius: '10px',
                boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  className="news-image-container"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <img
                    src={article.urlToImage || demoImage}
                    alt="news"
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </div>
                <Title
                  className="news-title"
                  level={4}
                  style={{ textAlign: 'center', marginBottom: '10px' }}
                >
                  {article.title.length > 60
                    ? `${article.title.substring(0, 60)}...`
                    : article.title}
                </Title>

                <p
                  style={{
                    textAlign: 'justify',
                    color: '#555',
                    marginBottom: '10px',
                  }}
                >
                  {article.description
                    ? `${article.description.substring(0, 100)}...`
                    : 'No description available.'}
                </p>

                <div
                  className="provider-container"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={demoImage} alt="" />
                    <Text
                      className="provider-name"
                      style={{ marginLeft: '8px' }}
                    >
                      {article.source.name || 'Unknown Source'}
                    </Text>
                  </div>
                  <Text style={{ fontSize: '12px', color: '#888' }}>
                    {moment(article.publishedAt).fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
