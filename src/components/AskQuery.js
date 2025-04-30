import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import API from '../services/api';

const AskQuery = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async () => {
    if (!question.trim()) {
      return message.warning('Please enter a question');
    }

    try {
      await API.post('queries/', { question });
      message.success('Query submitted successfully!');
      setQuestion('');
    } catch (error) {
      console.error('Error submitting query:', error);
      message.error('Failed to submit query');
    }
  };

  return (
    <div
      style={{
        marginTop: '50px',
        padding: '20px',
        borderTop: '1px solid #ccc',
      }}
    >
      <h2>Ask a Query</h2>
      <Input.TextArea
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your question here..."
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: '10px' }}
      >
        Send
      </Button>
    </div>
  );
};

export default AskQuery;
