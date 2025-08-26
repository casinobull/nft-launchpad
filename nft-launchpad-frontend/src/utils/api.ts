import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Sign-in with Ethereum
  async siwe(message: string, signature: string) {
    const response = await api.post('/auth/siwe', { message, signature });
    return response.data;
  },

  // Verify SIWE message
  async verify(message: string, signature: string) {
    const response = await api.post('/auth/verify', { message, signature });
    return response.data;
  },
};

// Collections API
export const collectionsAPI = {
  // Get all collections
  async getAll() {
    const response = await api.get('/collections');
    return response.data;
  },

  // Get collection by address
  async getByAddress(address: string) {
    const response = await api.get(`/collections/${address}`);
    return response.data;
  },

  // Get collection mints
  async getMints(address: string) {
    const response = await api.get(`/collections/${address}/mints`);
    return response.data;
  },
};

// Deployment API
export const deployAPI = {
  // Deploy new collection
  async deploy(data: {
    name: string;
    symbol: string;
    baseURI: string;
    maxSupply: number;
    mintPrice: string;
  }) {
    const response = await api.post('/deploy', data);
    return response.data;
  },
};

// Mint API
export const mintAPI = {
  // Mint NFT
  async mint(data: {
    collectionAddress: string;
    tokenURI: string;
    mintPrice?: string;
  }) {
    const response = await api.post('/mint', data);
    return response.data;
  },
};

// Upload API
export const uploadAPI = {
  // Upload file to IPFS
  async upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;
