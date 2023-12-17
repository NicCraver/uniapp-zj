export function useListHeight() {
  const height = uni.getSystemInfoSync().windowHeight;
  return height;
}
