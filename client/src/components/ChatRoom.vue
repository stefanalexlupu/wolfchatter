<template>
  <div class="chatroom">
    <p v-if="!$store.state.activeRoom">Click on the map to start a chat</p> 
    <div v-else>
      <p class="chatroom__title">{{ $store.state.activeRoom }}</p>
      <ul class="chatroom__messages">
        <Message v-for="(message, index) in $store.state.messages" :key="index" :message="message"/>
      </ul>
      <MessageForm />
    </div>
  </div>
</template>

<script>
import Message from './Message'
import MessageForm from './MessageForm'
export default {
  components: {Message, MessageForm}
}
</script>

<style>
.chatroom {
  position: fixed;
  top: 2rem;
  right: 2rem;
  max-height: 60%;
  width: 400px;
  background-color: white;
  z-index: 1000;
  padding: 1rem;
}

.chatroom__title {
  text-align: center;
}

.chatroom__messages {
  margin: 1rem 0;
}
</style>