<template>
  <div>
      <Form :is-add=true :task="Task" :id=null />
  </div>
</template>
<script>
import Form from '@/components/todo/Form'
export default {
  data() {
    return {
      Task: {
        name: '',
        status: 1
      },
    }
  },
  components: {
    Form
  }
}
</script>
