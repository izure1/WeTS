<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import App from '@/App/App.js'
import View from '@/View/View.js'

@Component
export default class Children extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
}
</script>