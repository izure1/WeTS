<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import View from '@/View/View.js'

@Component
export default class Transform extends Vue {
    @Prop() private body!: View
}
</script>