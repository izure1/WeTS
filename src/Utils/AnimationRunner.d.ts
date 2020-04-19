import { EaseType } from '@/Utils/ease';
declare class AnimationRunner {
    private start;
    private end;
    private duration;
    private remainTime;
    private ease;
    private tick;
    /**
     *
     * @param start         애니메이션을 시작할 현재값입니다.
     * @param end           애니메이션이 완료될 때 최종값입니다.
     * @param duration      애니메이션이 진행될 시간(ms)입니다.
     * @param ease          애니메이션 타입을 지정합니다.
     */
    constructor(start: number, end: number, duration: number, ease?: EaseType);
    /**
     *
     * @param start         애니메이션을 시작할 현재값입니다.
     * @param end           애니메이션이 완료될 때 최종값입니다.
     * @param duration      애니메이션이 진행될 시간(ms)입니다.
     * @param ease          애니메이션 타입을 지정합니다.
     * @description         새로운 애니메이션을 생성합니다.
     */
    static create(start: number, end: number, duration: number, ease?: EaseType): AnimationRunner;
    /**
     *
     * @param animation     AnimationRunner 인스턴스입니다.
     * @description         애니메이션을 중지합니다.
     */
    static destroy(animation: AnimationRunner): void;
    /**
     * @description         현재 진행된 애니메이션 값을 반환합니다.
     */
    private get current();
    /**
     * @description         현재 진행도 0~1 사이의 숫자로 반환합니다.
     */
    private get progress();
    /**
     *
     * @param callback      매 프레임마다 호출될 콜백 함수입니다.
     * @returns             애니메이션이 완료될 시점을 알려주는 프로미스를 반환합니다.
     * @description         애니메이션을 시작합니다.
     */
    run(callback: (current: number, progress: number) => void): Promise<this>;
    /**
     * @description         애니메이션을 중지합니다.
     */
    destroy(): void;
}
export default AnimationRunner;
