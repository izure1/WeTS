import { WatchOptions, ComponentOptions } from 'vue'
import { createDecorator, VueDecorator } from 'vue-class-component'

export function Watch(path: string, options: WatchOptions = {}): VueDecorator {
    const { deep = false, immediate = false } = options
    return createDecorator((componentOptions: ComponentOptions, key: string, index: number): void => {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null)
        }
      
        const watch: any = componentOptions.watch
      
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]]
        } else if (typeof watch[path] === 'undefined') {
            watch[path] = []
        }
      
        watch[path].push({ handler, deep, immediate })
    })
}