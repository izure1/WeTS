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
        const app: WeJS.App = new App // 새로운 viewport 만들기
        const scene: WeJS.Scene3d = new Scene3d // 새로운 씬 만들기

        scene.onStart(async (transfer: Map<string, WeJS.View>): Promise<void> => {

            const text: WeJS.View = new View

            // 텍스트를 보여주기 위해 텍스트 컴포넌트를 생성합니다.
            const textComponent: WeJS.Component = ComponentFactory.create(Reservation.Text)
            ComponentList.add(text.component, textComponent)

            // 객체의 텍스트를 설정합니다
            text.component.text.width = 200
            text.component.text.fontSize = 50
            text.component.text.content = 'fps: 0'
            text.component.text.color = 'yellow'
            text.component.text.borderColor = 'black'
            text.component.text.textAlign = 'center'
            text.component.text.fontWeight = 'bold'

            // 씬에 객체를 추가합니다.
            scene.launch(text)
            transfer.set('text', text)

        }).onUpdate(async (transfer: Map<string, WeJS.View>, delta: number): Promise<void> => {

            const text: WeJS.View = transfer.get('text')!
            text.component.text.content = `fps: ${~~(1000 / delta)}`

        }).onDestroy(scene.clear)

        
        Promise.resolve().then(async (): Promise<void> => {
            // 앱이 부착될 element를 지정
            app.element = '#sample'
            app.size = [800, 500]

            // 앱에서 씬을 실행
            await app.start()
            await app.launch(scene)
        })
    }
}
</script>