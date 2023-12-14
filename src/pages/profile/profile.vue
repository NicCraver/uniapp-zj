<script lang="ts" setup>
import { useInit } from '@/hooks/useInit';

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
});
</script>

<template>
  <GlobalNavbar>
    <nut-navbar title="我的"> </nut-navbar>
  </GlobalNavbar>
</template>

<style lang="scss" scoped></style>
