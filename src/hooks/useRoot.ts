export function useRoot() {
  const { userInfo } = useStore('root');
  return {
    userInfo
  };
}
