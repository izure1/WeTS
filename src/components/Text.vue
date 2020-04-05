<template>
    <div
        :style="{
            width: parseTextSize(body.component.text.width),
            height: parseTextSize(body.component.text.height),
            fontSize: parseTextSize(body.component.text.fontSize),
            fontFamily: body.component.text.fontFamily,
            fontWeight: body.component.text.fontWeight,
            fontStyle: body.component.text.fontStyle,
            color: body.component.text.color,
            textAlign: body.component.text.textAlign,
            lineHeight: body.component.text.lineHeight,
            textStroke: `${body.component.text.fontSize / 20}px ${body.component.text.borderColor}`,
            letterSpacing: `${body.component.text.letterSpacing}px`,
            wordSpacing: `${body.component.text.wordSpacing}px`,
        }">{{ body.component.text.content }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import App from '@/App/App'
import View from '@/View/View'

@Component
export default class VueComponent extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View

    /**
     * @description         주어진 값을 텍스트 사이즈에 사용할 수 있는 형식으로 변환합니다.
     */
    private parseTextSize(v: string | number): string | number {
        const r = Number(v)
        return isNaN(r) ? v : `${r}px`
    }
}
</script>