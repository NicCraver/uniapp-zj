export function useAddLock() {
  function add() {
    uni.navigateTo({ url: '/pages/scanCode/scanCode' });
  }
  onMounted(() => {});
  return { add, addLockList };
}
