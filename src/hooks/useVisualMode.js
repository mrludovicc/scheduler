import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setHistory(prev => [...prev, mode]);
    };
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  };
  return { mode: history[history.length - 1], transition, back };
};