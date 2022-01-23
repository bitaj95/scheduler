import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode);
    setHistory([...history, newMode])
  }

  const back = () => {
    if (history.length > 1 ) {
      const historyGoneBack = history.slice(0, -1);
      setHistory(history.slice(0, -1));
      setMode(historyGoneBack.slice(-1)[0]);
    }

  
  }

  return { mode, transition, back }
}
