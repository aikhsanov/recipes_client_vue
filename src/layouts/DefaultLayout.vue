<template>
  <div class="container border-2 border-amber-400 mx-auto min-h-screen p-4">
    <!--    <header></header>-->
    <slot />
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style scoped></style>
