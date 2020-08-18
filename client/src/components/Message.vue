<template>
  <li class="message mb-4">
    <p>
      <span class="font-bold">{{ message.userName }}:</span>
      {{ message.message }}
    </p>
    <p class="text-right text-sm text-gray-700">
    {{ message.date }}
    </p>
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