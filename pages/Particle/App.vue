<template>
    <div id="sample" />
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import * as WeJS from '../../src/main'

@Component
export default class App extends Vue {
    private mouseVector: [number, number] = [0, 0]

    @Watch('mouseVector')
    private onChangeMouseVector(): void {
        console.log(this.mouseVector)
    }

    mounted() {
        const { AssetLoader, App, Scene3d, View, ComponentList, ComponentFactory, Reservation } = WeJS
        const app: WeJS.App = new App
        const scene: WeJS.Scene3d = new Scene3d

        app.onPreload(async (): Promise<void> => {
            AssetLoader.add('/assets/image/particle_flame.png', 'image/png')
            await AssetLoader.load()
        }).on('mousemove', (e: MouseEvent): void => {
            this.mouseVector = [e.offsetX, e.offsetY]
        })

        scene.onStart(async (): Promise<void> => {
            const object: WeJS.View = new View
            ComponentList.add(object.component, ComponentFactory.create(Reservation.Particle))
            ComponentList.add(object.component, ComponentFactory.create(Reservation.Text))

            object.component.text.content = 'Emitter'
            object.component.particle.src = '/assets/image/particle_flame.png'
            object.component.particle.quantity = 5

            await scene.launch(object)
            scene.physics.start()
        }).onDestroy(scene.clear)

        Promise.resolve().then(async (): Promise<void> => {
            app.element = '#sample'
            app.size = [800, 500]

            await app.start()
            await app.launch(scene)
        })
    }
}
</script>