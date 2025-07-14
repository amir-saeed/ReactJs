import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage?.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage?.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

const Practice = () => {

  const [name, setName] = useLocalStorage('userName', '');
  const [count, setCount] = useLocalStorage('userCount', 0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>8. Local Storage Hook (Persist Data)</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello {name}!</p>
      <button onClick={() => setCount(c => c + 1)}>
        Click count: {count}
      </button>
      <p>Refresh page - data persists!</p>
    </div>
  );

}

export default Practice;