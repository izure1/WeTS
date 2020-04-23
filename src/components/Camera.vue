<script lang="ts">
import { defineComponent } from 'vue'
import App from '../App/App'
import View from '../View/View'

export default defineComponent({
    props: {
        app: { type: App, required: true },
        scene: { type: View, required: true },
        body: { type: View, required: true },
    }
})
</script>