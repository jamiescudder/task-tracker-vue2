<template>
  <div>
    <AddTask v-show="showAddTask" :loadEditTask="$store.state.loadEditTask" />
    <Tasks :tasks="$store.state.tasks" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";

export default Vue.extend({
  name: "my-tracker",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  // data() {},
  created(): void {
    this.$store.state.tasks = this.$store.dispatch("fetchTasks");
  },
});
</script>