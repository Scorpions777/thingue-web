<script setup lang="ts">
import {sendUserCommand, stream, config} from "@/pixelstreaming";
import {onMounted, ref} from "vue";

const InstanceSelect = ref();
const instanceList = ref([])

onMounted(async () => {
  const result = await fetch("/api/instance/instanceSelect", {
    method: 'POST',
    headers: new Headers([["Content-Type", "application/json"]]),
    body: JSON.stringify({}),
  })
  const response = await result.json()
  if (response.code === 200) {
    instanceList.value = response.data
  }

  // 添加选择项变化的事件监听器
  const InstanceSelectElement = InstanceSelect.value
  InstanceSelectElement.addEventListener("change", function () {
    switchInstance(InstanceSelectElement.value)
  });
})

function switchInstance(name: string) {
  stream.disconnect()
  config.instanceName = name
  stream.connect()
}

</script>

<template>
  <div class="overlay">
    <button @click="sendUserCommand({data:'test'})">测试发送消息</button>
    <select ref="InstanceSelect">
      <option v-for="item in instanceList" :key="item.sid" :value="item.name">{{ item.name }}</option>
    </select>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  z-index: 31;
}
</style>