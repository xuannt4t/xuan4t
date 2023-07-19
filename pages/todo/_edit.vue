<template>
  <div>
    <Form :is-add=false :task="Task" :id=Number(id)></Form>
  </div>
</template>
<script>
import Form from '@/components/todo/Form'
export default {
  components: {
    Form
  },
  data () {
    return {
      id: this.$route.params.edit,
      Task: {
      }
    }
  },
  beforeMount() {
    this.$store.dispatch('todo/previewDataAction', this.$route.params.edit)
      .then((res) => {
        this.Task = res
      })
  }
}
</script>
