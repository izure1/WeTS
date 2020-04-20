<template>
    <div>
        <div id="sample" />
        <hr />
        <div>
            <div>
                X axis <input type="number" v-model="x">
                Y axis <input type="number" v-model="y">
                Z axis <input type="number" v-model="z">
            </div>
            <div>
                Rotate X <input type="number" v-model="rotateX">
                Rotate Y <input type="number" v-model="rotateY">
                Rotate Z <input type="number" v-model="rotateZ">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as WeJS from '../../src/index'

@Component
export default class App extends Vue {
    private scene: WeJS.Scene3d | null = null
    private x: number = 0
    private y: number = 0
    private z: number = 0.1
    private rotateX: number = 0
    private rotateY: number = 0
    private rotateZ: number = 0
    /**
     * @description     주어진 숫자들 사이, 임의의 숫자를 반환합니다.
     */
    private getRandomNumber(a: number, b: number): number {
        const between: number = b - a
        return (Math.random() * between) + a
    }

    /**
     * @description     카메라를 직진시킵니다.
     */
    private runCamera() {
        setInterval((): void => {
            if (this.scene) {
                let { x, y, z, rotateX, rotateY, rotateZ } = this
                x = Number(x)
                y = Number(y)
                z = Number(z)
                rotateX = Number(rotateX)
                rotateY = Number(rotateY)
                rotateZ = Number(rotateZ)
                if (isNaN(x) || isNaN(y) || isNaN(z) || isNaN(rotateX) || isNaN(rotateY) || isNaN(rotateZ)) return
                const { camera } = this.scene.component
                camera.x += x
                camera.y += y
                camera.z += z
                camera.rotateX += rotateX
                camera.rotateY += rotateY
                camera.rotateZ += rotateZ
            }
        }, 1000 / 60)
    }

    mounted() {
        const { App, Scene3d, View, ComponentList, ComponentFactory, Reservation } = WeJS
        const app: WeJS.App = new App
        const scene: WeJS.Scene3d = new Scene3d

        this.scene = scene
        scene.onStart(async (): Promise<void> => {
            const MAX_COUNT: number = 100 // 만들어 질 객체의 개수입니다
            const SPACE_RADIUS: number = 250 // 만들어 질 공간의 반지름입니다. 이 범위 안에 객체가 생성됩니다.

            // 랜덤한 위치에 다수의 객체를 만드록 씬에 붙여 넣습니다.
            for (let i: number = 0; i < MAX_COUNT; i++) {
                const object: WeJS.View = new View
                // 랜덤한 좌표를 받아옵니다.
                const x: number = this.getRandomNumber(-SPACE_RADIUS, SPACE_RADIUS)
                const y: number = this.getRandomNumber(-SPACE_RADIUS, SPACE_RADIUS)
                const z: number = this.getRandomNumber(-SPACE_RADIUS, SPACE_RADIUS)

                ComponentList.add(object.component, ComponentFactory.create(Reservation.Text))
                object.id = `object_${i}`
                object.component.text.content = `Hello,\n${i} Object!`
                object.component.text.color = 'black'
                object.component.text.borderColor = 'white'
                object.component.text.borderWidth = 3
                object.component.text.fontSize = 20
                object.component.transform.x = x
                object.component.transform.y = y
                object.component.transform.z = z

                await scene.addScene(object)
            }
        }).onDestroy(scene.clear)

        Promise.resolve().then(async (): Promise<void> => {
            app.element = '#sample'
            app.size = [800, 500]

            const splash: WeJS.Scene3d = new Scene3d
            ComponentList.add(splash.component, ComponentFactory.create(Reservation.Text))
            splash.component.text.content = 'Building...'

            await app.start(splash)
            await app.launch(scene)

            this.runCamera()
        })
    }
}
</script>

<style lang="scss" scoped>
input[type=number] {
    width: 50px;
}
</style>