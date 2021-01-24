import React from 'react';

export const useLocalStorage = (key, initialState) => {
  const [data, setData] = React.useState(initialState);

  React.useEffect(() => {
    const item = localStorage.getItem(key);
    if (!item) return;
    setData(JSON.parse(item));
  }, [key]);

  const set = (item) => {
    setData(item);
    localStorage.setItem(key, JSON.stringify(item));
  };

  return [data, set];
};
