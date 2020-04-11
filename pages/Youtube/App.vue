<template>
    <div id="sample" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as WeJS from '../../src/main'

@Component
export default class App extends Vue {
    mounted() {
        const { App, Scene3d, View, ComponentList, ComponentFactory, Reservation } = WeJS
        const app: WeJS.App = new App
        const scene: WeJS.Scene3d = new Scene3d
        
        scene.onStart(async (): Promise<void> => {
            // 유튜브 HTML 코드를 받아옵니다.
            const YOUTUBE_HTML: string = '<iframe width="560" height="315" src="https://www.youtube.com/embed/qag4ewos4TE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            const youtube: WeJS.View = new View

            // View 인스턴스에 HTML 컴포넌트를 추가합니다.
            ComponentList.add(youtube.component, ComponentFactory.create(Reservation.Html))
            // HTML 코드를 지정합니다.
            youtube.component.html.content = YOUTUBE_HTML

            await scene.launch(youtube)
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