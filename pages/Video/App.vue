<template>
    <div id="sample" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as WeJS from '../../src/main'

@Component
export default class App extends Vue {
    mounted() {
        const { AssetLoader, App, Scene3d, View, ComponentList, ComponentFactory, Reservation } = WeJS
        const app: WeJS.App = new App
        const scene: WeJS.Scene3d = new Scene3d

        // 에셋을 비동기로 로드합니다.
        // 이 에셋이 모든 씬에서 공통으로 사용될 것이라면, 앱 실행 시 불러오는 것이 좋습니다.
        app.onPreload(async (): Promise<void> => {
            // 로드할 에셋을 추가합니다. 추가와 동시에 비동기로 에셋을 로드하기 시작할 것입니다.
            AssetLoader.add('/assets/video/sample.mp4', 'video/mp4')
            // 에셋을 모두 불러올 때 까지 대기합니다.
            await AssetLoader.load()
            console.log(`${AssetLoader.assets.map(t => t.uri).join(', ')} assets loaded!`)
        })

        scene.onStart(async (): Promise<void> => {
            const video: WeJS.View = new View
            // 비디오를 보여주기 위해 비디오 컴포넌트를 생성합니다.
            const videoComponent = ComponentFactory.create(Reservation.Video)
            ComponentList.add(video.component, videoComponent)
            // 객체에 비디오 경로를 추가합니다.
            video.component.video.src = '/assets/video/sample.mp4'
            // 객체의 비디오 넓이를 지정합니다.
            video.component.video.width = 300
            // 씬에 객체를 추가합니다.
            scene.launch(video)
            // 비디오를 재생합니다.
            video.component.video.play()
        }).onDestroy(scene.clear)

        Promise.resolve().then(async (): Promise<void> => {
            app.element = '#sample'
            app.size = [800, 500]

            const splash: WeJS.Scene3d = new WeJS.Scene3d
            ComponentList.add(splash.component, ComponentFactory.create(Reservation.Text))
            splash.component.text.content = 'Loading...'

            await app.start(splash)
            await app.launch(scene)
        })
    }
}
</script>