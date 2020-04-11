import ease, { EaseType } from '@/Utils/ease'

class AnimationRunnerGroup {
    private animations: Map<string, AnimationRunner> = new Map

    /**
     * 
     * @param key           애니메이션의 고유 키값입니다.
     * @param start         애니메이션을 시작할 현재값입니다.
     * @param end           애니메이션이 완료될 때 최종값입니다.
     * @param duration      애니메이션이 진행될 시간(ms)입니다.
     * @param ease          애니메이션 타입을 지정합니다.
     * @description         새로운 애니메이션을 추가합니다. 이후 update 메서드를 이용하십시오.
     */
    run(key: string, start: number, end: number, duration: number, ease: EaseType): void {
        const animation = new AnimationRunner
        animation.run(start, end, duration, ease)
        this.animations.set(key, animation)
    }

    /**
     * 
     * @param interval      이전 업데이트와 현재 사이의 간격 시간(ms)입니다.
     * @description         매 프레임마다 호출하여 애니메이션이 얼마나 진행되었는지를 알려주십시오.
     */
    update(interval: number): void {
        for (const animation of this.animations.values())
            animation.update(interval)
    }
    
    /**
     * 
     * @param key           애니메이션의 고유 키값입니다.
     * @description         해당 고유 키값을 가지고 있는 애니메이션이 있는지 여부를 반환합니다.
     */
    has(key: string): boolean {
        return this.animations.has(key)
    }

    /**
     * 
     * @param key           애니메이션의 고유 키값입니다.
     * @description         해당 고유 키값을 가지고 있는 애니메이션을 삭제합니다. 존재했다면 참을, 그렇지 않다면 거짓을 반환합니다.
     */
    delete(key: string): boolean {
        return this.animations.delete(key)
    }
}

class AnimationRunner {
    private remainStep: number = 0
    private start: number = 0
    private end: number = 0
    private duration: number = 0
    private ease: EaseType = EaseType.Linear

    /**
     * 
     * @param start         애니메이션을 시작할 현재값입니다.
     * @param end           애니메이션이 완료될 때 최종값입니다.
     * @param duration      애니메이션이 진행될 시간(ms)입니다.
     * @param ease          애니메이션 타입을 지정합니다.
     * @description         애니메이션을 시작합니다. 이후 update 메서드를 이용하십시오.
     */
    run(start: number, end: number, duration: number, ease: EaseType): void {
        this.start = start
        this.end = end
        this.remainStep = duration
        this.duration = duration
        this.ease = ease
    }

    /**
     * 
     * @param interval      이전 업데이트와 현재 사이의 간격 시간(ms)입니다.
     * @description         매 프레임마다 호출하여 애니메이션이 얼마나 진행되었는지를 알려주십시오.
     */
    update(interval: number): void {
        this.remainStep -= interval
    }

    /**
     * @description         현재 애니메이션을 업데이트합니다.
     */
    get current(): number {
        return ease(
            this.ease,
            this.duration - this.remainStep,
            this.start,
            this.end - this.start,
            this.duration)
    }
}

export {
    AnimationRunner,
    AnimationRunnerGroup,
}