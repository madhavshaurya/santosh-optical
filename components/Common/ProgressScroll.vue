<template>
  <div
    class="progress-wrap cursor-pointer"
    role="button"
    tabindex="0"
    aria-label="Back to top"
    @keydown.enter.prevent="handleScrollToTop"
    @keydown.space.prevent="handleScrollToTop"
  >
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102" aria-hidden="true">
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
//= Scripts
import scrollToTop from '@/common/scrollToTop';

let cleanup = null;

onMounted(() => {
  cleanup = scrollToTop();
});

onUnmounted(() => {
  if (cleanup) cleanup();
});

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
