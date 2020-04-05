<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import App from '@/App/App'
import View from '@/View/View'

@Component
export default class VueComponent extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
}
</script>