<template>
    <div
        :style="{
            width: `${this.body.component.rect.width}px`,
            height: `${this.body.component.rect.height}px`,
            borderWidth: `${this.body.component.rect.borderWidth}px`,
            backgroundColor: this.body.component.rect.color,
            borderColor: this.body.component.rect.borderColor,
        }" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import App from '@/App/App'
import View from '@/View/View'

@Component
export default class Dataset extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
}
</script>