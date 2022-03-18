<template>
  <div id="navbtns">
    <!-- TODO: Add font awesome icons -->
    <a>
      <router-link class="icon-text" to="/">
        <!-- <fa class="icon" icon="house" /> -->
        Home
      </router-link>
    </a>
    <a>
      <router-link class="icon-text" to="/tasks">
        <!-- <fa class="icon" icon="gears" /> -->
        Tasks
      </router-link>
    </a>
    <a>
      <router-link class="icon-text" to="/about">
        <!-- <fa class="icon" icon="book" /> -->
        About
      </router-link>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "side-navbar"
});
</script>

<style scoped>
#navbtns {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 1%;
  left: 1%;
  z-index: 8888;
  /* transform: translateY(-50%); */
  gap: 20px;
}

a {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 15px;
  color: black;
}

a:hover {
  color: red;
}

a:active {
  color: green;
}

.icon {
  height: 50px;
  width: 50px;
}

.icon-text {
  font-size: 1.5em;
}
</style>