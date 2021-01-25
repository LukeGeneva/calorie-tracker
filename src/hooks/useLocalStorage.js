import React from 'react';

export const useLocalStorage = (key, initialState, parse = JSON.parse) => {
  const [data, setData] = React.useState(initialState);

  React.useEffect(() => {
    const item = localStorage.getItem(key);
    if (!item) return;
    setData(parse(item));
  }, [key, parse]);

  const set = (item) => {
    setData(item);
    localStorage.setItem(key, JSON.stringify(item));
  };

  return [data, set];
};
