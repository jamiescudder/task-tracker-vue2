<template>
  <div>
    <div :key="task.id" v-for="task in tasks">
      <Task :task="task" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Task from "./Task.vue"

export default Vue.extend({
  name: "all-tasks",
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
});
</script>