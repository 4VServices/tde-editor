import axios from 'axios';
import { buildAuthHeaders } from './buildAuthHeader';

export const getTemplates = async (dbName) => {
  try {
    const res = await axios.request({
      method: 'GET',
      headers: buildAuthHeaders(),
      url: `${process.env.REACT_APP_API_URL || ''}/tde/templates?contentDB=${dbName}`
    });
    return res.data;
  } catch (e) {
    throw Error(e);
  }
};

export const getTemplate = async (dbName, templateURI) => {
  try {
    const res = await axios.request({
      method: 'GET',
      headers: buildAuthHeaders(),
      url: `${process.env.REACT_APP_API_URL || ''}/tde/template/get?contentDB=${dbName}&templateURI=${templateURI}`
    });
    return res.data;
  } catch (e) {
    throw Error(e);
  }
};

export const templateValidate = async (data) => {
  let headers = buildAuthHeaders();
  try {
    const res = await axios.request({
      method: 'POST',
      headers,
      url: `${process.env.REACT_APP_API_URL || ''}/tde/template/validate`,
      data
    });
    return res.data;
  } catch (e) {
    throw Error(e);
  }
};

export const templateExtract = async (uriParam, contentDb, data) => {
  let headers = buildAuthHeaders();
  try {
    const res = await axios.request({
      method: 'POST',
      headers,
      url: `${process.env.REACT_APP_API_URL || ''}/tde/template/extract?${uriParam}&contentDB=${contentDb}`,
      data
    });
    return res.data;
  } catch (e) {
    throw Error(e);
  }
};

export const templateInsert = async (templateURI, contentDb, data) => {
  let headers = buildAuthHeaders();
  //   headers.append('Content-Type', 'application/json');
  try {
    const res = await axios.request({
      method: 'POST',
      headers: headers,
      url: `${process.env.REACT_APP_API_URL || ''}/tde/template/insert?uri=${templateURI}&contentDB=${contentDb}`,
      data
    });
    return res.data;
  } catch (e) {
    throw Error(e);
  }
};
