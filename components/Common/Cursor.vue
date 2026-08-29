<template>
  <div class="cursor"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let cleanups = [];

onMounted(() => {
  const link = document.querySelectorAll('.hover-this');
  const cursor = document.querySelector('.cursor');

  if (!cursor) return;

  const animateit = function (e) {
    const hoverAnim = this.querySelector('.hover-anim');
    if (!hoverAnim) return;

    const { offsetX: x, offsetY: y } = e;
    const { offsetWidth: width, offsetHeight: height } = this;
    const move = 25;
    const xMove = x / width * (move * 2) - move;
    const yMove = y / height * (move * 2) - move;

    hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === 'mouseleave') hoverAnim.style.transform = '';
  };

  const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  };

  link.forEach(b => {
    b.addEventListener('mousemove', animateit);
    b.addEventListener('mouseleave', animateit);
    cleanups.push(() => {
      b.removeEventListener('mousemove', animateit);
      b.removeEventListener('mouseleave', animateit);
    });
  });

  window.addEventListener('mousemove', editCursor);
  cleanups.push(() => {
    window.removeEventListener('mousemove', editCursor);
  });

  const interactiveElements = document.querySelectorAll("a, .cursor-pointer");
  interactiveElements.forEach(el => {
    const handleMouseEnter = () => cursor.classList.add('cursor-active');
    const handleMouseLeave = () => cursor.classList.remove('cursor-active');

    // Optimization: Use mouseenter instead of mousemove to set active state once per hover
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    cleanups.push(() => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    });
  });
});

// Clean up event listeners on unmount to prevent memory leaks and redundant mousemove handler execution
onUnmounted(() => {
  cleanups.forEach(cleanup => cleanup());
  cleanups = [];
});
</script>