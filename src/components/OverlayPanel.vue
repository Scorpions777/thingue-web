<script setup lang="ts">
import {sendUserCommand} from "@/pixelstreaming";

</script>

<template>
  <div class="overlay">
    <button @click="sendUserCommand({data:'test'})">测试发送消息</button>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  z-index: 100;
}
</style>