import axios from 'axios';
import { buildAuthHeaders } from './buildAuthHeader';

export const login = async ({ username, password }) => {
  return axios.request({
    url: `${process.env.REACT_APP_API_URL || ''}/login`,
    headers: buildAuthHeaders(),
    method: 'post',
    data: {
      'username': username,
      'password': password
    }
  });
};

export const fetchUser = async () => {
  return axios.request({
    url: `${process.env.REACT_APP_API_URL || ''}/status`,
    headers: buildAuthHeaders(),
    method: 'get'
  });
};

export const logout = async () => {
  return axios.request({
    url: `${process.env.REACT_APP_API_URL || ''}/status`,
    headers: buildAuthHeaders(),
    method: 'post'
  });
};
