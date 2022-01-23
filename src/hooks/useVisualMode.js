import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = (newMode) => {
    setMode(newMode);
  }

  return { mode, transition }
}

/* 
export default function useTransition(previousMode, newMode) {
  const previousObj = useVisualMode(previousMode);
  const updatedObj = useVisualMode(newMode);

  return {...previousObj, ...updatedObj };

} */