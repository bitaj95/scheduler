export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  return {
    mode
  }
}