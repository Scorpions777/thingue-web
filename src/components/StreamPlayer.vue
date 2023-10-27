<script setup lang="ts">
import {Application, PixelStreamingApplicationStyle} from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4';
import {stream} from "@/pixelstreaming";
import {onMounted, ref} from "vue";

const player = ref();

onMounted(() => {
  const PixelStreamingApplicationStyles = new PixelStreamingApplicationStyle();
  PixelStreamingApplicationStyles.applyStyleSheet();
  const application = new Application({
    stream,
    onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode)
  });
  player.value.appendChild(application.rootElement)
})
</script>

<template>
  <div ref="player" style="width: 100vw; height: 100vh;"></div>
</template>

<style scoped>

</style>