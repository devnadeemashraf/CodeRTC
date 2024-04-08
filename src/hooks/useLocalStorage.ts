/* eslint-disable @typescript-eslint/no-explicit-any */
const useLocalStorage = () => {
  const getItems = (key: string) => {
    const result = localStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    } else {
      return null;
    }
  };

  const setItems = (key: string, value: any) => {
    return localStorage.setItem(key, JSON.stringify(value));
  };

  const clearCache = () => {
    console.log("Clearing Cache");
    return localStorage.clear();
  };

  return {
    getItems,
    setItems,
    clearCache,
  };
};

export default useLocalStorage;
