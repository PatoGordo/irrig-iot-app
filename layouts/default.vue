<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="flex flex-col items-start justify-start w-full h-full">
    <slot />
    <loading />
    <span />

    <div v-if="!$route.fullPath.includes('/auth/')" class="btm-nav fixed z-10">
      <nuxt-link
        to="/dashboard"
        :class="
          $route.name === 'dashboard' || $route.fullPath.includes('/new/rent')
            ? 'active'
            : ''
        "
      >
        <iconify-icon icon="bx:home-alt-2" width="24"></iconify-icon>
        <span class="btm-nav-label text-xs">Home</span>
      </nuxt-link>

      <nuxt-link to="/history" :class="$route.name === 'history' && 'active'">
        <iconify-icon icon="fluent:history-16-filled" width="24"></iconify-icon>
        <span class="btm-nav-label text-xs">Histórico</span>
      </nuxt-link>

      <!-- <nuxt-link
        to="/analytics"
        :class="$route.name === 'analytics' ? 'active' : ''"
      >
        <iconify-icon
          icon="carbon:agriculture-analytics"
          width="24"
        ></iconify-icon>
        <span class="btm-nav-label text-xs">Analíticos</span>
      </nuxt-link> -->

      <nuxt-link
        to="/profile"
        :class="
          $route.name === 'profile' || $route.name === 'manage-users'
            ? 'active'
            : ''
        "
      >
        <iconify-icon icon="bx:user" width="24"></iconify-icon>
        <span class="btm-nav-label text-xs">Perfil</span>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
.page-content {
  @apply w-full flex flex-col items-start justify-start gap-4 p-4 relative z-10 pb-20;
  > h2,
  .page-title {
    @apply text-2xl font-bold;
  }
  > h3,
  .page-subtitle {
    @apply text-xl font-bold;
  }
}

.btm-nav a.active {
  @apply border-t-info text-info;
}
</style>
