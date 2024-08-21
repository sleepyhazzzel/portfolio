<template>

<!-- https://noahchen.me/posts/tresjs/ -->

  <div id="tres-container">
    <TresCanvas> <!--  建立場景 -->

      <TresPerspectiveCamera :position="[9, 9, 9]" alpha />
      <!--  default => :position="[3,3,3]"  -->
      
      <OrbitControls />

      <TresMesh ref="coneRef" :position="[-2, 2, 0]" :rotation="[0, Math.PI, 0]">
        <TresConeGeometry :args="[1, 1.5, 3]" />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresMesh :position="[0, 0, 0]" cast-shadow>
        <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresMesh ref="sphereRef" :position="[2, -2, 0]">
        <TresSphereGeometry />
        <!-- <TresMeshToonMaterial color="#FBB03B" /> -->
        <TresMeshNormalMaterial />
      </TresMesh>

      <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
      <TresGridHelper /> <!--  平面網格 -->
    </TresCanvas>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Text3D } from '@tresjs/cientos';

const coneRef = ref()
const sphereRef = ref()
const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  coneRef.value.rotation.y = Math.sin(elapsed)
  sphereRef.value.position.y = Math.sin(elapsed)
})
</script>

<style lang="sass" scoped>
#tres-container
  width: 100%
  height: calc(100vh - 65px - 105px)
  // 扣掉 header 和 footer 的高度
</style>
