<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import View from '@/View/View.js'

@Component
export default class Camera extends Vue {
    @Prop() private body!: View
}
</script>