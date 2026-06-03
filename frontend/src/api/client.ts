const API_BASE = '/api';

let token = localStorage.getItem('token');

export function setToken(t: string) {
  token = t;
  localStorage.setItem('token', t);
}

export function getToken() {
  return token;
}

export function clearToken() {
  token = null;
  localStorage.removeItem('token');
}

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    clearToken();
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.text();
    console.error('API error:', path, err);
    throw new Error(err || 'Request failed');
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  // Rooms
  getRooms: () => request('/rooms'),
  getRoom: (id: string) => request(`/rooms/${id}`),
  getRoomActiveSession: (roomId: string) => request(`/rooms/${roomId}/active-session`),
  createRoom: (data: any) => request('/rooms', { method: 'POST', body: JSON.stringify(data) }),
  updateRoom: (id: string, data: any) =>
    request(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Menu
  getMenuItems: (active = true) => request(`/menu-items?active=${active}`),
  getMenuItem: (id: string) => request(`/menu-items/${id}`),
  createMenuItem: (data: any) =>
    request('/menu-items', { method: 'POST', body: JSON.stringify(data) }),
  updateMenuItem: (id: string, data: any) =>
    request(`/menu-items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  toggleMenuItemActive: (id: string) =>
    request(`/menu-items/${id}/toggle-active`, { method: 'PUT' }),

  getMenuCategories: () => request('/menu-categories'),

  // Sessions
  createSession: (roomId: string, data: any) =>
    request(`/sessions/room/${roomId}`, { method: 'POST', body: JSON.stringify(data) }),
  getActiveSessions: () => request('/sessions/active'),
  getSession: (id: string) => request(`/sessions/${id}`),
  addItem: (sessionId: string, menuItemId: string, quantity = 1) =>
    request(`/sessions/${sessionId}/items`, {
      method: 'POST', body: JSON.stringify({ menuItemId, quantity }),
    }),
  closeBill: (sessionId: string, paymentMethod: string, amountTendered?: number, overrides?: any) =>
    request(`/sessions/${sessionId}/close`, {
      method: 'POST', body: JSON.stringify({ paymentMethod, amountTendered, ...overrides }),
    }),

  // Dashboard
  getDashboard: () => request('/sessions/dashboard'),
  getTodayBills: () => request('/sessions/bills/today'),
  getAllBills: () => request('/sessions/bills/all'),
  createManualBill: (data: any) => request('/sessions/bills/manual', { method: 'POST', body: JSON.stringify(data) }),
  getBill: (id: string) => request(`/sessions/bills/${id}`),

  // Admin
  getVenues: () => request('/admin/venues'),
  getVenue: (id: string) => request(`/admin/venues/${id}`),
  createVenue: (data: any) =>
    request('/admin/venues', { method: 'POST', body: JSON.stringify(data) }),
  updateVenue: (id: string, data: any) =>
    request(`/admin/venues/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  toggleVenueStatus: (id: string) =>
    request(`/admin/venues/${id}/toggle-status`, { method: 'PUT' }),
  deleteVenue: (id: string) =>
    request(`/admin/venues/${id}`, { method: 'DELETE' }),
};
