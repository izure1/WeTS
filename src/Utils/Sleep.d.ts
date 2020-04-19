declare class Sleep {
    /**
     *
     * @param duration  대기할 시간(ms)입니다.
     * @description     일정 시간동안 대기합니다.
     */
    static wait(duration: number): Promise<void>;
}
export default Sleep;
