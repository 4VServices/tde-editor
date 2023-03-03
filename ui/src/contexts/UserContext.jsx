import { fetchUser, logout as logoutApi } from 'apis/user';
import React, { useEffect, useState, createContext, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isPublicUrl } from 'utils';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [fetched, setFetched] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await fetchUser();
        if (res.data?.isAuthenticated) setUser(res.data);
      } catch (e) {
      } finally {
        setFetched(true);
      }
    };

    fn();
  }, []);

  const logout = useCallback(() => {
    logoutApi()
      .then(() => {})
      .finally(() => {
        setUser();
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isPublicUrl(location.pathname)) {
        return;
      }
      const res = await fetchUser();
      if (!res.data?.isAuthenticated) {
        logout();
      }
    }, 60000); // check auth every 60 seconds and if unauthed, redirect to login page
    return () => clearInterval(interval);
  }, [location, logout, user]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout
    }),
    [user, logout]
  );

  if (!fetched) return null;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
