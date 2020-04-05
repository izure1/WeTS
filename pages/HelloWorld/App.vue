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
        const scene: WeJS.Scene3d = new Scene3d // 새로운 씬

        scene.onStart(async (): Promise<void> => {

            const objectA: WeJS.Scene3d = new Scene3d // 씬에 들어갈 객체A
            const objectB: WeJS.View = new View // 객체A 하위에 들어갈 객체B

            // 객체A의 하위에 객체B를 넣어주기 위해,
            // 하위 객체를 넣을 수 있는 기능을 가진 'children' 컴포넌트를 추가해야한다.
            const childrenComponent: WeJS.Component = ComponentFactory.create(Reservation.Children)

            // 만들어진 컴포넌트를 객체A에 추가한다
            ComponentList.add(objectA.component, childrenComponent)
            objectA.onStart(() => {
                // 이제 실제로 객체A에 객체B를 넣어보자
                objectA.launch(objectB)
            }).onDestroy(() => {
                objectA.component.children.lists.clear()
            })

            // 객체B에 텍스트 기능을 추가하자.
            // 텍스트를 출력해주는 기능을 가진 컴포넌트를 객체B에 추가해야한다.
            const textComponent: WeJS.Component = ComponentFactory.create(Reservation.Text)

            // 만들어진 컴포넌트를 객체B에 추가
            ComponentList.add(objectB.component, textComponent)
            
            // 객체B의 출력될 텍스트를 지정
            objectB.component.text.content = 'Hello, World!'


            const htmlComponent: WeJS.Component = ComponentFactory.create(Reservation.Html)
            ComponentList.add(objectB.component, htmlComponent)
            objectB.component.html.content = ''

            // 씬에 객체A를 추가한다.
            // 객체B는 이미 객체A에 속해있으니, 따로 씬에 추가하지 않아도 된다.
            scene.launch(objectA)

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