<template>
  <footer>
    <p>Copyright &copy; 2021</p>
    <router-link to="/about">About</router-link>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "main-footer"
})
</script>

<style scoped>
a {
  color: #333;
}

footer {
  margin-top: 30px;
  text-align: center;
}
</style>