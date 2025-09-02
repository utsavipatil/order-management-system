import axios from 'axios';

// Function to determine current environment
const getEnvironment = () => {
  // NODE_ENV is set by React scripts: 'development', 'production', or 'test'
  const nodeEnv = process.env.NODE_ENV;
  
  // Check for custom environment variable if you want to distinguish staging
  const customEnv = process.env.REACT_APP_ENV;
  
  if (customEnv === 'local') return 'local';
  if (customEnv === 'dev') return 'development';
  if (customEnv === 'stg') return 'staging';
  if (customEnv === 'prod' || nodeEnv === 'production') return 'production';
  
  // Default to development if nothing else matches
  return 'development';
};

// Get the current environment
const currentEnv = getEnvironment();
console.log(`Current environment: ${currentEnv}`);

// Get the API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
console.log(`API Base URL: ${API_BASE_URL}`);


// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Order API endpoints
export const orderApi = {
  placeOrder: (orderData) => {
    return apiClient.post('/order/place-order', orderData);
  },
  // Add other order-related API calls here as needed
  // getOrders: () => apiClient.get('/order/list'),
  // getOrderById: (id) => apiClient.get(`/order/${id}`),
};

export default apiClient;
