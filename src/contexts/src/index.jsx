import { useEffect, useState, createContext, useMemo } from 'react';
import { getSharedData } from '@miq/utils';

export const SharedDataCtx = createContext();

export const SharedDataProvider = ({ children }) => {
  const [value, setValue] = useState({ isLoaded: false });

  const path = window.location.href;

  useEffect(() => {
    // setValue({ isLoaded: false });

    getSharedData()
      .then((data) => {
        setValue({ ...data, isLoaded: true });
      })
      .catch((err) => {
        setValue({ isLoaded: false });
      });
  }, [path]);

  const sharedCtx = useMemo(() => {
    const updateSite = (siteData) => {
      setValue({ ...value, site: { ...value.site, ...siteData } });
    };

    const updateUser = (userData) => {
      setValue({ ...value, user: { ...value.user, ...userData } });
    };
    return { ...value, updateUser, updateSite };
  }, [value]);

  // if (!value.isLoaded) return <div>Loading ...</div>;
  if (!value.isLoaded) return null;

  return <SharedDataCtx.Provider value={sharedCtx}>{children}</SharedDataCtx.Provider>;
};

SharedDataProvider.propTypes = {
  // children: PropTypes.arrayOf([PropTypes.node]).isRequired,
};
