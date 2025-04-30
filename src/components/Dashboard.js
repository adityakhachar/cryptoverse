import React, { useEffect, useState } from 'react';
import { fetchMyQueries } from '../services/api';
import { Card, List, Typography, Spin } from 'antd';

const Dashboard = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchMyQueries()
      .then((res) => {
        setQueries(res.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        console.error('Error fetching queries:', err);
        setLoading(false); // Stop loading on error
      });
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography.Title level={3}>My Queries</Typography.Title>
      {loading ? (
        <Spin tip="Loading..." /> // Show loading spinner while fetching
      ) : (
        <List
          dataSource={queries}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={`Submitted on ${new Date(item.created_at).toLocaleString()}`}
              >
                <p>
                  <strong>Question:</strong> {item.question}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {item.is_answered ? 'Answered' : 'Pending'}
                </p>
                {item.response && (
                  <p>
                    <strong>Answer:</strong> {item.response}
                  </p>
                )}
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Dashboard;
