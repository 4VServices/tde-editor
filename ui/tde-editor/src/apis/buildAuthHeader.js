import base64 from 'base-64';

export const buildAuthHeaders = () => {
  return {
    authorization: 'Basic ' + base64.encode('admin:admin')
  };
};
