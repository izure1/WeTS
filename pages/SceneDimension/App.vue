<template>
    <div id="sample" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as WeJS from '../../src/main'

@Component
export default class App extends Vue {
    mounted() {
        const { App, Scene2d, Scene3d, View, ComponentList, ComponentFactory, Reservation } = WeJS
        const app: WeJS.App = new App
        const scene2d: WeJS.Scene2d = new Scene2d
        const scene3d: WeJS.Scene3d = new Scene3d
        
        scene2d.onStart(async (): Promise<void> => {
            const text: WeJS.View = new View
            ComponentList.add(text.component, ComponentFactory.create(Reservation.Text))
            text.component.text.content = 'Hello! I\'m in 2D scene'
            await scene2d.launch(text)
        }).onDestroy(scene2d.clear)

        scene3d.onStart(async (): Promise<void> => {
            const text: WeJS.View = new View
            ComponentList.add(text.component, ComponentFactory.create(Reservation.Text))
            text.component.text.content = 'Hello! I\'m in 3D scene'
            await scene3d.launch(text)
        }).onDestroy(scene3d.clear)

        Promise.resolve().then(async (): Promise<void> => {
            app.element = '#sample'
            app.size = [800, 500]

            await app.start()
            await app.launch(scene2d, scene3d)
            console.log(scene2d, scene3d)
        })
    }
}
</script>