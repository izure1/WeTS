<template>
    <div class="particle-renderer">
        <div v-for="(emitter, i) in emitters" :key="`emitter_${i}`">
            <div v-for="particleBody in emitter" :key="`particle_${particleBody.id}`">
                <img :src="AssetLoader.getUri(particleBody.particle.src)" class="particle-item" :style="{
                    mixBlendMode: particleBody.particle.blend,
                    position: 'absolute',
                    transform: `
                        translate3d(
                            ${centerPointX(particleBody)}px,
                            ${centerPointY(particleBody)}px,
                            ${centerPointZ(particleBody)}px)
                        scale(${particleBody.particle.scale})`
                }">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
//import Matter from 'matter-js'
import AssetLoader from '@/Asset/AssetLoader'
import ParticleBody from '@/Particle/ParticleBody'
import App from '@/App/App'
import View from '@/View/View'

@Component
export default class ParticleRenderer extends Vue {
    @Prop() private emitters!: ParticleBody[][]
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
    private AssetLoader: typeof AssetLoader = AssetLoader

    /**
     * @description     파티클 객체의 크기를 계산하여 중앙 x좌표를 반환합니다.
     */
    private centerPointX(body: ParticleBody): number {
        return body.object.position.x - (body.particle.width / 2)
    }

    /**
     * @description     파티클 객체의 크기를 계산하여 중앙 y좌표를 반환합니다.
     */
    private centerPointY(body: ParticleBody): number {
        return body.object.position.y - (body.particle.height / 2)
    }

    /**
     * @description     파티클 객체의 z좌표를 반환합니다. TODO: 크기 계산이 제대로 안되고 있습니다. 좀 더 고쳐야 함.
     */
    private centerPointZ(body: ParticleBody): number {
        return body.particle.perspective
    }
}
</script>

<style lang="scss" scoped>
.particle-renderer {
    width: 0;
    height: 0;
}
</style>