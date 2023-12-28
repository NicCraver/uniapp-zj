export function useGetUserInfo() {
  const { setUserInfo } = useStore('root');
  const userInfo = ref<any>({});
  onMounted(() => {
    apiGetInfo().then((res: any) => {
      userInfo.value = {
        ...res.user,
        permissions: res.permissions,
        roles: res.roles
      };
      setUserInfo({
        ...res.user,
        permissions: res.permissions,
        roles: res.roles
      });
    });
  });
  return {
    userInfo
  };
}
