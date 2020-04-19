<template>
    <div id="sample" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as WeJS from '../../src/main'

@Component
export default class App extends Vue {
    /**
     * @description     주어진 숫자들 사이, 임의의 숫자를 반환합니다.
     */
    private getRandomNumber(a: number, b: number): number {
        const between: number = b - a
        return (Math.random() * between) + a
    }

    mounted() {
        const { AssetLoader, ArrayExtra, App, Scene3d, View, ComponentList, ComponentFactory, Reservation } = WeJS
        const app: WeJS.App = new App
        const scene: WeJS.Scene3d = new Scene3d

        app.onPreload(async (): Promise<void> => {
            AssetLoader.add('/assets/audio/crash.mp3', 'audio/mp3')
            AssetLoader.add('/assets/image/particle_flame.png', 'image/png')
            await AssetLoader.load()
        })

        scene.onStart(async (): Promise<void> => {

            scene.physics.start()

            // 땅을 만듭니다.
            const ground: WeJS.View = new View
            ComponentList.add(ground.component, ComponentFactory.create(Reservation.Rect))
            ComponentList.add(ground.component, ComponentFactory.create(Reservation.Physics))
            ground.component.rect.width = 1600
            ground.component.rect.height = 30
            ground.component.rect.color = 'grey'
            ground.component.transform.y = -250
            ground.component.physics.isStatic = true
            ArrayExtra.add(ground.component.physics.colliders, 'ground')

            await scene.addScene(ground)

            // 떨어지는 물체를 만듭니다.
            const MAX_COUNT = 50

            for (let i = 0; i < MAX_COUNT; i++) {
                const square: WeJS.View = new View
                square.id = i.toString()
                ComponentList.add(square.component, ComponentFactory.create(Reservation.Physics))
                ComponentList.add(square.component, ComponentFactory.create(Reservation.Rect))
                ComponentList.add(square.component, ComponentFactory.create(Reservation.Audio))
                const { rect, physics, filter, audio, transform } = square.component

                rect.color = `rgb(${this.getRandomNumber(0, 255)}, ${this.getRandomNumber(0, 255)}, ${this.getRandomNumber(0, 255)})`
                rect.width = 35
                rect.height = 35

                physics.isStatic = false
                ArrayExtra.add(physics.colliders, 'square')

                filter.cursor = 'pointer'
                audio.src = '/assets/audio/crash.mp3'

                transform.x = this.getRandomNumber(-300, 300)
                transform.y = 200
                transform.y = this.getRandomNumber(300, 500)

                square.on('collisionStart', (): void => {
                    filter.opacity = 0.1
                    audio.play()
                })
                square.on('collisionEnd', (): void => {
                    filter.opacity = 1
                })
                square.on('click', (): void => {
                    square.component.physics.applyForce(0, 0.05)
                })

                await scene.addScene(square)
            }

            const test: WeJS.View = new View
            ComponentList.add(test.component, ComponentFactory.create(Reservation.Particle))
            test.component.particle.src = '/assets/image/particle_flame.png'
            test.component.particle.quantity = 1
            ArrayExtra.add(test.component.particle.colliders, 'particle')

            await scene.addScene(test)

            // 충돌 관계를 지정합니다.
            // 이 경우, square 콜라이더와 ground를 콜라이더를 가지는 객체끼리 충돌할 것입니다.
            scene.physics.collision.addCollision('square', 'ground')
            scene.physics.collision.addCollision('square', 'particle')

        }).onDestroy(scene.clear)

        Promise.resolve().then(async (): Promise<void> => {
            app.element = '#sample'
            app.size = [800, 500]

            const splash: WeJS.Scene3d = new Scene3d
            ComponentList.add(splash.component, ComponentFactory.create(Reservation.Text))
            splash.component.text.content = 'Building...'

            // 앱에서 씬을 실행합니다.
            await app.start(splash)
            await app.launch(scene)
        })
    }
}
</script>