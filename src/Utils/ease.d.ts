export declare enum EaseType {
    Linear = "linear",
    EaseInQuad = "easeInQuad",
    EaseOutQuad = "easeOutQuad",
    EaseInOutQuad = "easeInOutQuad",
    EaseInCubic = "easeInCubic",
    EaseOutCubic = "easeOutCubic",
    EaseInOutCubic = "easeInOutCubic",
    EaseInSine = "easeInSine",
    EaseOutSine = "easeOutSine",
    EaseInOutSine = "easeInOutSine",
    EaseInQuart = "easeInQuart",
    EaseOutQuart = "easeOutQuart",
    EaseInOutQuart = "easeInOutQuart",
    EaseInQuint = "easeInQuint",
    EaseOutQuint = "easeOutQuint",
    EaseInOutQuint = "easeInOutQuint",
    EaseInExpo = "easeInExpo",
    EaseOutExpo = "easeOutExpo",
    EaseInOutExpo = "easeInOutExpo",
    EaseInCirc = "easeInCirc",
    EaseOutCirc = "easeOutCirc",
    EaseInOutCirc = "easeInOutCirc",
    EaseInElastic = "easeInElastic",
    EaseOutElastic = "easeOutElastic",
    EaseInOutElastic = "easeInOutElastic",
    EaseInBack = "easeInBack",
    EaseOutBack = "easeOutBack",
    EaseInOutBack = "easeInOutBack",
    EaseInBounce = "easeInBounce",
    EaseOutBounce = "easeOutBounce",
    EaseInOutBounce = "easeInOutBounce"
}
/**
 *
 * @param e  Easing type
 * @param t  Current time
 * @param b  Beginning value
 * @param c  Change in value
 * @param d  Duration
 */
export default function ease(e: string, t: number, b: number, c: number, d: number): number;
