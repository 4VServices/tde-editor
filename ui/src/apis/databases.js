import axios from 'axios';
import { buildAuthHeaders } from './buildAuthHeader';

export const getDatabases = async () => {
  try {
    const res = await axios.request({
      method: 'GET',
      headers: buildAuthHeaders(),
      url: `${process.env.REACT_APP_API_URL || ''}/databases`
    });
    return res.data;
  } catch (e) {
    throw Error(e);
  }
};
