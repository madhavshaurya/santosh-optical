<template>
  <div class="cursor"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

// Optimization: Use requestAnimationFrame for smooth cursor updates & cleanup listeners on unmount
let rafId = null;
let mouseX = 0;
let mouseY = 0;
let isPendingUpdate = false;

let linkNodes = [];
let activeNodes = [];
let animateitFn = null;
let editCursorFn = null;
let onMouseEnterActiveFn = null;
let onMouseLeaveActiveFn = null;

onMounted(() => {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  linkNodes = document.querySelectorAll('.hover-this');
  activeNodes = document.querySelectorAll("a, .cursor-pointer");

  animateitFn = function (e) {
    const hoverAnim = this.querySelector('.hover-anim');
    if (!hoverAnim) return;

    const { offsetX: x, offsetY: y } = e;
    const { offsetWidth: width, offsetHeight: height } = this;
    const move = 25;
    const xMove = (x / width) * (move * 2) - move;
    const yMove = (y / height) * (move * 2) - move;

    hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === 'mouseleave') hoverAnim.style.transform = '';
  };

  const updateCursorPosition = () => {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    isPendingUpdate = false;
  };

  editCursorFn = e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isPendingUpdate) {
      isPendingUpdate = true;
      rafId = requestAnimationFrame(updateCursorPosition);
    }
  };

  onMouseEnterActiveFn = () => cursor.classList.add('cursor-active');
  onMouseLeaveActiveFn = () => cursor.classList.remove('cursor-active');

  linkNodes.forEach(b => {
    b.addEventListener('mousemove', animateitFn);
    b.addEventListener('mouseleave', animateitFn);
  });
  window.addEventListener('mousemove', editCursorFn);

  activeNodes.forEach(el => {
    el.addEventListener('mousemove', onMouseEnterActiveFn);
    el.addEventListener('mouseleave', onMouseLeaveActiveFn);
  });
});

onUnmounted(() => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  if (editCursorFn) {
    window.removeEventListener('mousemove', editCursorFn);
  }
  if (linkNodes.length && animateitFn) {
    linkNodes.forEach(b => {
      b.removeEventListener('mousemove', animateitFn);
      b.removeEventListener('mouseleave', animateitFn);
    });
  }
  if (activeNodes.length && onMouseEnterActiveFn && onMouseLeaveActiveFn) {
    activeNodes.forEach(el => {
      el.removeEventListener('mousemove', onMouseEnterActiveFn);
      el.removeEventListener('mouseleave', onMouseLeaveActiveFn);
    });
  }
});
</script>