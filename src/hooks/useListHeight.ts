export function useListHeight() {
  const { windowHeight } = useStore('root');
  const height = windowHeight;
  return height;
}
