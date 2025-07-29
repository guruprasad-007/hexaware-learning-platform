// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // IMPORTANT: Adjust this to your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;