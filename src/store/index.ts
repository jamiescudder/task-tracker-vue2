import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { taskObject } from '../../types'

import { RootState } from './types'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    title: 'Task Tracker',
    tasks: [],
    loadEditTask: {
      id: 0,
      text: "",
      day: "",
      reminder: false
    },
    showAddTask: false
  },
  getters: {

  },
  mutations: {
    toggleAddTask (state): void {
      state.showAddTask = !state.showAddTask
    },
    deleteTask (state, id): void {
      (state.tasks = state.tasks.filter((task) => task.id !== id))
      if (id === state.loadEditTask.id) {
        state.loadEditTask = {
          id: 0,
          text: "",
          day: "",
          reminder: false
        }
      }
    },
    toggleReminder (state, toggleLoad): void {
      const id = toggleLoad.id
      const data = toggleLoad.data

      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    },
    addTask (state, commitData): void {
      const task = commitData.task
      const data = commitData.data
      const exists = commitData.exists

      if (exists === false) {
        state.tasks = [...state.tasks, data]
      } else if (exists === true) {
        state.tasks = state.tasks.map((t) =>
          t.id === task.id
            ? {
                ...t,
                text: data.text,
                day: data.day,
                reminder: data.reminder
              }
            : t
        )
      }
    },
    editTask (state, taskToToggle): void {
      state.loadEditTask = taskToToggle
      if (!state.showAddTask) {
        state.showAddTask = true
      }
    },
    fetchTasks (state, data): void {
      state.tasks = data
    },
    fetchTask (state, data): void {
      console.log("mutation - fetchTasks")
      state.loadEditTask = data
    }
  },
  actions: {
    // TODO: Fix warning error expected array returned promise
    async fetchTasks ({ commit }): Promise<void> {
      const res = await fetch('api/tasks');
      const data = await res.json();
      commit('fetchTasks', data);
    },
    async fetchTask ({ commit }, id): Promise<taskObject> {
      console.log('fetchTask')
      const res = await fetch(`api/tasks/${id}`)
      const data = await res.json()
      commit('fetchTask', data)
      return data
    },
    async deleteTask ({ commit }, id): Promise<void> {
      if (confirm('Are you sure?')) {
        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE'
        })

        res.status === 200
          ? commit('deleteTask', id)
          : alert('Error deleting task')
      }
    },
    async toggleReminder ({ dispatch, commit }, id): Promise<void> {
      const taskToToggle = await dispatch('fetchTask', id)
      const updateTask = {
        ...taskToToggle,
        reminder: !taskToToggle.reminder
      }

      const res = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTask)
      })

      const data = await res.json()

      const toggleLoad = {
        id: id,
        data: data
      }

      commit('toggleReminder', toggleLoad)
    },
    async addTask ({ commit }, task): Promise<void> {
      if (task.id !== 0) {
        const res = await fetch(`api/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        })
        const data = await res.json()

        const existsData = {
          task: task,
          data: data,
          exists: true
        }

        commit('addTask', existsData)
      } else {
        const res = await fetch('api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        })
        const data = await res.json()

        const newData = {
          task: task,
          data: data,
          exists: false
        }
        commit('addTask', newData)
      }
    },
    async editTask ({ commit, dispatch }, id): Promise<void> {
      if (confirm('Are you sure you want to edit this task?')) {
        const taskToToggle = await dispatch('fetchTask', id) // get task and return json object
        commit('editTask', taskToToggle)
      }
    }
  },
  modules: {

  },
}

export default new Vuex.Store<RootState>(store);
