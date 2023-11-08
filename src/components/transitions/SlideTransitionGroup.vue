<template>
  <TransitionGroup name="slide-group">
    <slot />
  </TransitionGroup>
</template>

<style>
.slide-group-enter-active,
.slide-group-leave-active {
  transition: all 1s ease;
}

.slide-group-enter-from,
.slide-group-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
