import React, { useState } from 'react';

const TelegramIdInput = ({ onTelegramIdSet }) => {
  const [telegramId, setTelegramId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!telegramId) {
      setError('Please enter a Telegram ID');
      return;
    }
    if (isNaN(telegramId)) {
      setError('Telegram ID must be a number');
      return;
    }
    onTelegramIdSet(telegramId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Enter Telegram ID</h2>
        <p className="text-gray-600 mb-4">
          Please enter your Telegram ID to continue. This is required for authentication.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={telegramId}
            onChange={(e) => setTelegramId(e.target.value)}
            placeholder="Enter Telegram ID"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default TelegramIdInput; 