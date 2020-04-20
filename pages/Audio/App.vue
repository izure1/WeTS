<template>
    <div id="sample" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as WeJS from '../../src/index'

@Component
export default class App extends Vue {
    mounted() {
        const { AssetLoader, App, Scene3d, View, ComponentList, ComponentFactory, Reservation } = WeJS
        const app: WeJS.App = new App
        const scene: WeJS.Scene3d = new Scene3d
        
        app.onPreload(async (): Promise<void> => {
            AssetLoader.add('/assets/audio/sample.mp3', 'audio/mp3')
            await AssetLoader.load()
        })

        scene.onStart(async (): Promise<void> => {
            const audio: WeJS.View = new View
            ComponentList.add(audio.component, ComponentFactory.create(Reservation.Audio))
            audio.component.audio.src = '/assets/audio/sample.mp3'
            audio.component.audio.loop = true
            audio.component.audio.play()
            await scene.addScene(audio)
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