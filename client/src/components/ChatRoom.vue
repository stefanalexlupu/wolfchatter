<template>
  <div :class="['chatroom', {'chatroom--is-open': $store.state.activeRoom} ,'fixed', 'top-2', 'right-2', 'z-1000', 'p-4', 'bg-white', 'bg-opacity-90', 'rounded', 'shadow']">
    <slot name="default" v-if="!$store.state.activeRoom" /> 
    <div v-else class="flex flex-col h-full">
      <p class="chatroom__title text-center font-bold">{{ $store.state.activeRoom }}</p>
      <ul class="chatroom__messages my-6 px-2 flex-grow overflow-y-auto" ref="messageBox">
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
  components: { Message, MessageForm },

  watch: {
    '$store.state.messages'() {
      this.$nextTick().then(() => {
        this.$refs.messageBox.scrollTo(0, this.$refs.messageBox.scrollHeight)
      })
    }
  }
}
</script>

<style>
.chatroom {
  width: 400px;
}

.chatroom--is-open {
  height: 60%;
}
</style>