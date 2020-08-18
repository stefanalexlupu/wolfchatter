<template>
  <li class="message">
    {{ message.userName }}: {{ message.message }}
    {{ message.date }}
  </li>
</template>

<script>
export default {
  props: {
    message: Object
  }
}
</script>

<style>

</style>