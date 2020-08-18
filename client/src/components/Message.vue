<template>
  <li class="message mb-4">
    <p>
      <span class="font-bold">{{ message.userName }}:</span>
      {{ message.message }}
    </p>
    <p class="text-right text-sm text-gray-700">
    {{ formattedDate }}
    </p>
  </li>
</template>

<script>
import { formatRelative, parseISO } from 'date-fns'

export default {
  props: {
    message: Object
  },

  data() {
    return {
      formattedDate: formatRelative(parseISO(this.message.date), new Date())
    }
  }
}
</script>

<style>

</style>