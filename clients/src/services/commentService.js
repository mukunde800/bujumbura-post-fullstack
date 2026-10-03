import api from './api';

export default {
  getByArticle: (articleId) => api.get(`/comments/article/${articleId}`),
  create: (articleId, data) => api.post(`/comments/article/${articleId}`, data),
  updateStatus: (id, status) => api.patch(`/comments/${id}/status`, { status }),
  remove: (id) => api.delete(`/comments/${id}`),
  getAll: () => api.get('/comments'),
};