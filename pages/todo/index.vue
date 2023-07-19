<template>
    <div class="card-body p-4">
        <h4 class="text-center my-3 pb-3">To Do App</h4>
        <div class="mb-4 d-flex justify-content-between align-items-center">
            <div class="col-6">
                <input @input="search" placeholder="Search Task" v-model="keySearch" type="text" class="form-control">
            </div>
            <NuxtLink to="/todo/add"><button class="btn btn-success">+ Create Task</button></NuxtLink>
        </div>
        <div class="mb-3">
            <div class="col-6">
                <button @click="filterStatus()" class="btn-outline-danger btn btn-sm">All</button>
                <button @click="filterStatus(status.todo)" class="btn-outline-info btn btn-sm">Todo: <label class="mb-0"> {{ countStatusTask(status.todo) }} </label></button>
                <button @click="filterStatus(status.inprogress)" class="btn-outline-primary btn btn-sm">Inprogress: <label class="mb-0"> {{ countStatusTask(status.inprogress) }}  </label></button>
                <button @click="filterStatus(status.done)" class="btn-outline-success btn btn-sm">Done: <label class="mb-0"> {{ countStatusTask(status.done) }}  </label></button>
            </div>

        </div>
        <div class="overflow-auto">
            <p class="mt-3">Total task: {{ rows }} </p>
            <b-table id="my-table" :items="tasks" :fields="fields" :per-page="perPage" :current-page="currentPage" small>
                <template v-slot:cell(no)="row">
                  {{ row.index + 1 }}
                </template>
                <template v-slot:cell(actions)="row">
                    <NuxtLink :to="`/todo/${row.item.id}`">
                        <b-button variant="primary" size="sm">Edit</b-button>
                    </NuxtLink>
                    <b-button @click="deleteTask(row.item.id)" variant="danger" size="sm">Delete</b-button>
                </template>
                <template v-slot:cell(Status)="row">
                  <b-button v-if="Number(row.item.status) === 1" variant="info" size="sm">todo</b-button>
                  <b-button v-else-if="Number(row.item.status) === 2" variant="primary" size="sm">Inprogress</b-button>
                  <b-button v-else variant="success" size="sm">Done</b-button>
                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"
                aria-controls="my-table"></b-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keySearch: '',
            status: {
              todo: 1,
              inprogress: 2,
              done: 3
            },

            // Pagination
            perPage: 8,
            currentPage: 1,
            fields: [
                'No',
                {
                    key: 'name', label: 'Task'
                },
                'Status',
                'Actions'
            ],
        }
    },
    computed: {
        tasks() {
          return this.$store.getters["todo/filterData"]
        },

        rows() {
            return this.$store.state.todo.data.length
        },
    },

    beforeMount() {
        return this.$store.dispatch('todo/fetchDataAction')
    },

    methods: {
        deleteTask(id) {
            return this.$store.dispatch('todo/deleteDataAction', id)
        },

        search() {
          this.$store.commit('todo/setStatus', 0)
          return this.$store.commit('todo/setSearch', this.keySearch)
        },

        countStatusTask(status) {
          return this.$store.state.todo.data.filter(item => Number(item.status) === status).length
        },

        filterStatus(status = 0) {
          this.$store.commit('todo/setSearch', '')
          return this.$store.commit('todo/setStatus', status)
        }
    }
}
</script>
