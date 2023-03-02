export const PUBLIC_URLS = ['/login'];

export const isPublicUrl = (url) => {
  for (const condition of [...PUBLIC_URLS]) {
    if (typeof condition === 'string') {
      if (url.startsWith(condition)) {
        return true;
      }
    } else {
      if (condition.test(url)) {
        return true;
      }
    }
  }
  return false;
};
