import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('staylux_user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (_) { }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Hotels ───────────────────────────────────────────
export const hotelService = {
  getAll: () => api.get('/hotels'),
  getById: (id) => api.get(`/hotels/${id}`),
  search: (location) => api.get('/hotels/search', { params: { location } }),
};

// ─── Rooms ────────────────────────────────────────────
export const roomService = {
  getByHotelId: (hotelId) => api.get(`/rooms/hotel/${hotelId}`),
  getById: (id) => api.get(`/rooms/${id}`),
  search: (hotelId, bedType, minPrice, maxPrice) =>
    api.get('/rooms/search', { params: { hotelId, bedType, minPrice, maxPrice } }),
};

// ─── Bookings ─────────────────────────────────────────
export const bookingService = {
  create: (data) => api.post('/bookings', data),
  getByUserId: (userId) => api.get(`/bookings/user/${userId}`),
  getById: (id) => api.get(`/bookings/${id}`),
  getByReference: (ref) => api.get(`/bookings/reference/${ref}`),
};

// ─── Auth ─────────────────────────────────────────────
export const authService = {
  login: (data) => api.post('/users/login', data),
  register: (data) => api.post('/users/register', data),
  getById: (id) => api.get(`/users/${id}`),
};

export default api;
