import { EaseType } from '@/Utils/ease.js'

export default interface TransitionOption {
    ease: EaseType
    delay: number
    duration: number
}