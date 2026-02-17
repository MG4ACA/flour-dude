import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  async getAll() {
    const response = await api.get('/products');
    return response.data;
  },

  async create(product) {
    const response = await api.post('/products', product);
    return response.data;
  },

  async update(id, product) {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const categoryService = {
  async getAll() {
    const response = await api.get('/categories');
    return response.data;
  },

  async create(category) {
    const response = await api.post('/categories', category);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export default api;
