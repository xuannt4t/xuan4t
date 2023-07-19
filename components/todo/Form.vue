<template>
  <div>
    <h4 class="text-center my-3 pb-3">{{ isAdd ? 'Create' : 'Edit' }} To Do App</h4>
    <div class="mb-4">
      <div class="col-12 form-group">
        <label for="">{{ isAdd ? 'Create task' : 'Edit task' }}</label>
        <input type="text" placeholder="Task name" v-model="Task.name" class="form-control">
        <div class="mt-3">
          <select v-model="Task.status" class="form-control form-select form-select-lg mb-3" aria-label="Default select example">
            <option v-for="option in optionStatus" :value="option.label" :selected="option.label === Number(Task.status)">{{ option.value }}</option>
          </select>
        </div>
        <div class="mt-2">
          <button class="btn btn-success btn-sm" @click="ButtonSubmit()">
            {{ isAdd ? 'Create' : 'Edit'}}
          </button>
          <NuxtLink to="/todo">
            <button class="btn btn-danger btn-sm ml-2">
              Back
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      optionStatus: [
        {label: 1, value: 'To do'},
        {label: 2, value: 'Inprogress'},
        {label: 3, value: 'Done'}
      ]
    }
  },

  props: {
    isAdd: Boolean,
    Task: Object,
    id: Number,
  },

  beforeMount() {
    this.$store.commit("todo/setSearch", '')
  },

  methods: {
    ButtonSubmit() {
      if (!this.isAdd) {
        var params = {
          'id': this.id,
          'updateData': this.Task
        }
        this.$store.dispatch('todo/updateDataAction', params)
      }
      else {
        this.$store.dispatch('todo/createDataAction', this.Task)
      }
      this.$router.push('/todo/')
    }
  }
}
</script>
