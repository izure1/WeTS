<template>
    <div>
        <div id="sample" />
        <hr />
        Ease Type <select @change="changeEase"></select>
        Increase X <input type="number" v-model="increaseX" />
        Animation Duration <input type="number" v-model="duration" />
        <hr />
        Progress: {{ progress }}
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import * as WeJS from '../../src/main'

@Component
export default class App extends Vue {
    private ease: WeJS.EaseType = WeJS.EaseType.Linear
    private increaseX: number = 100
    private duration: number = 1000
    private progress: number = 0

    private changeEase(e: Event): void {
        const target: HTMLSelectElement = e.target! as HTMLSelectElement
        const key: keyof typeof WeJS.EaseType = target.value as keyof typeof WeJS.EaseType
        this.ease = WeJS.EaseType[key]
    }

    @Watch('increaseX')
    private onChangeIncreaseX(): void {
        this.increaseX = Number(this.increaseX)
    }

    @Watch('duration')
    private onChangeDuration(): void {
        this.duration = Number(this.duration)
    }

    mounted() {
        const { AnimationRunner, App, Scene3d, View, ComponentList, ComponentFactory, Reservation, EaseType } = WeJS
        const app: WeJS.App = new App
        const scene: WeJS.Scene3d = new Scene3d

        const selectEl: HTMLSelectElement = document.querySelector('select') as HTMLSelectElement
        for (const ease in EaseType) {
            const el: HTMLOptionElement = document.createElement('option') as HTMLOptionElement
            el.value = ease
            el.textContent = ease
            selectEl.appendChild(el)
        }
        
        scene.onStart(async (): Promise<void> => {
            const object: WeJS.View = new View
            ComponentList.add(object.component, ComponentFactory.create(Reservation.Text))
            object.component.text.content = 'Click me!'
            // View 인스턴스를 클릭하면 x좌표를 입력값 만큼 증가시킵니다.
            // 애니메이션 기능을 이용하여 부드럽게 이동하게 만듭니다.
            object.on('click', (): void => {
                // 현재 View 인스턴스의 x좌표를 받아옵니다.
                const x: number = object.component.transform.x
                const next: number = x + this.increaseX
                // 애니메이션 효과를 줍니다.
                // 애니메이션은 this.duration 에 걸쳐 진행되고, 사용자가 선택한 가속도(ease)를 가집니다.
                AnimationRunner.create(x, next, this.duration, this.ease).run((current: number, progress: number): void => {
                    // 애니메이션이 진행 중이면, View 인스턴스의 좌표값을 수정합니다.
                    object.component.transform.x = current
                    object.component.text.content = `Current X: ${~~current}`
                    this.progress = progress
                }).then((animation: WeJS.AnimationRunner): void => {
                    // 애니메이션이 완료되면 애니메이션을 파괴합니다.
                    AnimationRunner.destroy(animation)
                    this.progress = 0
                })
            })
            await scene.launch(object)
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