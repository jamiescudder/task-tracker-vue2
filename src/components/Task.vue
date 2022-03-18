<template>
  <div
    @dblclick="$store.dispatch('toggleReminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <h3>
      {{ task.text }}
      <div class="actions">
        <i
          @click="$store.dispatch('editTask', task.id)"
          class="fas fa-edit"
        ></i>
        <i
          @click="$store.dispatch('deleteTask', task.id)"
          class="fas fa-times"
        ></i>
      </div>
    </h3>
    <p>{{ task.day }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "task-item",
	props: {
		task: Object,
	},
	methods: {},
})
</script>

<style scoped>
.fa-times {
	color: red;
}
.fa-times:hover {
	color: black;
}
.fa-edit {
	color: green;
}
.fa-edit:hover {
	color: black;
}
.fas {
	margin: 5px;
}
.task {
	background: #f4f4f4;
	margin: 5px;
	padding: 10px 20px;
	cursor: pointer;
}
.task.reminder {
	border-left: 5px solid green;
}
.task h3 {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>