// ======================
// API BASE URL
// ======================

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api';


// ======================
// HELPER API CALL
// ======================

const apiCall = async (endpoint, options = {}) => {

  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add JWT token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {

    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    // Try to parse JSON response
    const data = await response.json();

    // Handle HTTP errors
    if (!response.ok) {

      throw new Error(
        data.error ||
        data.message ||
        'Something went wrong'
      );
    }

    return data;

  } catch (error) {

    console.error(
      `API Error (${endpoint}):`,
      error
    );

    throw error;
  }
};


// ======================
// AUTH APIs
// ======================

export const auth = {

  // Register
  register: (userData) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Login
  login: (credentials) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Get current user
  getMe: () =>
    apiCall('/auth/me'),

  // Logout
  logout: () =>
    apiCall('/auth/logout', {
      method: 'POST',
    }),

  // Verify email
  verifyEmail: (token) =>
    apiCall(`/auth/verify-email/${token}`),

  // Resend verification email
  resendVerification: () =>
    apiCall('/auth/resend-verification', {
      method: 'POST',
    }),
};


// ======================
// POSTS APIs
// ======================

export const posts = {

  // Get all posts
  getAll: (params = {}) => {

    const queryString =
      new URLSearchParams(params).toString();

    return apiCall(
      `/posts${queryString ? `?${queryString}` : ''}`
    );
  },

  // Get single post
  getOne: (id) =>
    apiCall(`/posts/${id}`),

  // Create post
  create: (postData) =>
    apiCall('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    }),

  // Relate to post
  relate: (postId) =>
    apiCall(`/posts/${postId}/relate`, {
      method: 'POST',
    }),

  // Delete post
  delete: (postId) =>
    apiCall(`/posts/${postId}`, {
      method: 'DELETE',
    }),

  // Get my posts
  getMyPosts: () =>
    apiCall('/posts/user/my-posts'),

  // Bookmark post
  bookmark: (postId) =>
    apiCall(`/posts/${postId}/bookmark`, {
      method: 'POST',
    }),

  // Report post
  report: (postId, reason) =>
    apiCall(`/posts/${postId}/report`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }),

  // Get reported posts
  getReported: () =>
    apiCall('/posts/reported'),

  // Admin delete post
  adminDelete: (postId) =>
    apiCall(`/posts/admin/${postId}`, {
      method: 'DELETE',
    }),
};


// ======================
// COMMENTS APIs
// ======================

export const comments = {

  // Get comments for post
  getByPost: (postId) =>
    apiCall(`/comments/post/${postId}`),

  // Create comment
  create: (commentData) =>
    apiCall('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    }),

  // Delete comment
  delete: (commentId) =>
    apiCall(`/comments/${commentId}`, {
      method: 'DELETE',
    }),
};


// ======================
// CATEGORIES APIs
// ======================

export const categories = {

  // Get all categories
  getAll: () =>
    apiCall('/categories'),
};


// ======================
// ADMIN APIs
// ======================

export const admin = {

  // Get users
  getUsers: () =>
    apiCall('/admin/users'),

  // Ban user
  banUser: (userId, reason) =>
    apiCall(`/admin/users/${userId}/ban`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    }),

  // Unban user
  unbanUser: (userId) =>
    apiCall(`/admin/users/${userId}/unban`, {
      method: 'PUT',
    }),

  // Delete user
  deleteUser: (userId) =>
    apiCall(`/admin/users/${userId}`, {
      method: 'DELETE',
    }),
};