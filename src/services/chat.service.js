import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class ChatService {
  // Get all chats for the current user
  async getUserChats(page = 1, limit = 20) {
    try {
      const response = await axios.get(`${API_URL}/chats`, {
        params: { 
          page, 
          limit,
          userId: '67fba439cf98acec362a6a2f' // Hardcoded user ID for testing
        }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  }

  // Get chat history for a specific chat
  async getChatHistory(chatId, page = 1, limit = 50) {
    try {
      const response = await axios.get(`${API_URL}/chats/${chatId}`, {
        params: { 
          page, 
          limit,
          userId: "67fba439cf98acec362a6a2f" // Hardcoded user ID for testing
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  }

  // Send a message in a chat
  async sendMessage(chatId, content) {
    try {
      const response = await axios.post(
        `${API_URL}/chats/${chatId}/messages`,
        { 
          content,
          userId: "67fba439cf98acec362a6a2f" // Hardcoded user ID for testing
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Mark messages as read
  async markAsRead(chatId) {
    try {
      const response = await axios.post(
        `${API_URL}/chats/${chatId}/read`,
        {
          userId: "67fba439cf98acec362a6a2f" // Hardcoded user ID for testing
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }

  // Update typing status
  async updateTypingStatus(chatId, isTyping) {
    try {
      const response = await axios.post(
        `${API_URL}/chats/${chatId}/typing`,
        { 
          isTyping,
          userId: "67fba439cf98acec362a6a2f" // Hardcoded user ID for testing
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating typing status:', error);
      throw error;
    }
  }
}

export default new ChatService(); 