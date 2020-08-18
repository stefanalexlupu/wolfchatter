<template>
  <form @submit.prevent="onSubmit">
    <input v-model="userName" type="text" placeholder="Write your username here">
    <div>
      <input v-model="message" type="text" placeholder="Write message here">
      <button @click="onSubmit">SEND</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      message: ''
    }
  },

  methods: {
    onSubmit() {
      if (!this.userName || !this.message) {
        return
      }

      this.$socket.emit('chat-message', {userName: this.userName, message: this.message})
      this.message = ''
    }
  }
}
</script>