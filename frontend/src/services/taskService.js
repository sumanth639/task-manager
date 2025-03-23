import { API_BASE_URL } from '../config';

// Helper function to handle fetch requests
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Use the Bearer prefix
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Get all tasks
export const getTasks = async () => {
  return fetchWithAuth(`${API_BASE_URL}/api/tasks`);
};

// Add a new task
export const addTask = async (taskData) => {
  return fetchWithAuth(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
};

// Update a task
export const updateTask = async (id, taskData) => {
  return fetchWithAuth(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
};

// Delete a task
export const deleteTask = async (id) => {
  return fetchWithAuth(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
};
