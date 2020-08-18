<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="userName"
      type="text"
      placeholder="Write your username here"
      class="border rounded border-gray-700 p-2 w-full mb-2"
    >
    <div class="flex">
      <input
        v-model="message"
        type="text"
        placeholder="Write message here"
        class="border rounded border-gray-700 p-2 flex-grow"
      >
      <button
        @click="onSubmit"
        class="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-700 hover:border-transparent rounded"
      >SEND</button>
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