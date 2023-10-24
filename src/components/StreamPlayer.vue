<script setup lang="ts">
import { Application, PixelStreamingApplicationStyle } from '@thingue/lib-pixelstreamingfrontend-ui';
import { stream } from "@/pixelstreaming";
import { onMounted, ref } from "vue";

const player = ref();

onMounted(() => {
  const PixelStreamingApplicationStyles = new PixelStreamingApplicationStyle();
  PixelStreamingApplicationStyles.applyStyleSheet();
  const application = new Application({
    stream,
    onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode),
    // 隐藏UI上的控制元素配置
    // settingsPanelConfig: {
    //   isEnabled: true,
    //   visibilityButtonConfig: {
    //     creationMode: 2
    //   }
    // },
    // statsPanelConfig: {
    //   isEnabled: true,
    //   visibilityButtonConfig: {
    //     creationMode: 2
    //   }
    // },
    // fullScreenControlsConfig: {
    //   creationMode: 2
    // },
    // videoQpIndicatorConfig: {
    //   disableIndicator: true
    // },
  });
  // 显示设置面板
  // application.settingsPanel.show()
  player.value.appendChild(application.rootElement)
})
</script>

<template>
  <div ref="player" style="width: 100vw; height: 100vh;"></div>
</template>

<style scoped></style>