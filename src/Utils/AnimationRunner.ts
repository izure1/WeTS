import ease, { EaseType } from '../Utils/ease'
import Tick from '../Utils/Tick'

class AnimationRunner {
    private start: number = 0
    private end: number = 0
    private duration: number = 0
    private remainTime: number = 0
    private ease: EaseType = EaseType.Linear
    private tick: string | null = null

    /**
     * 
     * @param start         애니메이션을 시작할 현재값입니다.
     * @param end           애니메이션이 완료될 때 최종값입니다.
     * @param duration      애니메이션이 진행될 시간(ms)입니다.
     * @param ease          애니메이션 타입을 지정합니다.
     */
    constructor(start: number, end: number, duration: number, ease: EaseType = EaseType.Linear) {
        this.start = start
        this.end = end
        this.duration = duration
        this.remainTime = duration
        this.ease = ease
    }
    
    /**
     * 
     * @param start         애니메이션을 시작할 현재값입니다.
     * @param end           애니메이션이 완료될 때 최종값입니다.
     * @param duration      애니메이션이 진행될 시간(ms)입니다.
     * @param ease          애니메이션 타입을 지정합니다.
     * @description         새로운 애니메이션을 생성합니다.
     */
    static create(start: number, end: number, duration: number, ease: EaseType = EaseType.Linear): AnimationRunner {
        return new AnimationRunner(start, end, duration, ease)
    }

    /**
     * 
     * @param animation     AnimationRunner 인스턴스입니다.
     * @description         애니메이션을 중지합니다.
     */
    static destroy(animation: AnimationRunner): void {
        animation.destroy()
    }

    /**
     * @description         현재 진행된 애니메이션 값을 반환합니다.
     */
    private get current(): number {
        return ease(this.ease, (this.duration - this.remainTime), this.start, (this.end - this.start), this.duration)
    }

    /**
     * @description         현재 진행도 0~1 사이의 숫자로 반환합니다.
     */
    private get progress(): number {
        return 1 - (this.remainTime / this.duration)
    }

    /**
     * 
     * @param callback      매 프레임마다 호출될 콜백 함수입니다.
     * @returns             애니메이션이 완료될 시점을 알려주는 프로미스를 반환합니다.
     * @description         애니메이션을 시작합니다.
     */
    run(callback: (current: number, progress: number) => void): Promise<this> {
        return new Promise((resolve): void => {
            this.tick = Tick.request((now: number, interval: number): void => {
                this.remainTime -= interval
                if (this.remainTime < 0) {
                    this.remainTime = 0
                    resolve(this)
                }
                callback(this.current, this.progress)
            })
        })
    }

    /**
     * @description         애니메이션을 중지합니다.
     */
    destroy(): void {
        if (this.tick)
            Tick.cancelRequest(this.tick)
    }
}

export default AnimationRunner