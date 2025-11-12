<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
