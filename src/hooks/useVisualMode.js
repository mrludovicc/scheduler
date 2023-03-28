import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      const newHistory = [...history.slice(0, -1), mode];
      setHistory(newHistory);
      setMode(mode);
    } else {
      setMode(mode);
      setHistory(prev => [...prev, mode]);
    }
  };
  // console.log(history)
  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history.slice(0, -1)];
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };
  return { mode, transition, back };
}