declare class Tick {
    private static last;
    private static list;
    /**
     *
     * @param callback  업데이트 될 때 마다 실행될 콜백함수입니다. requestAnimationFrame과 달리 1회용이 아니라, 저장되어 지속적으로 실행됩니다.
     * @param interval  callback 함수 호출 간격을 설정합니다. 지정하지 않는다면 매 프레임마다 호출될 것입니다.
     * @returns         콜백함수의 ID값을 반환합니다. 이후에 Tick.cancelRequest 함수의 인수로 ID값을 넘겨 제거할 수 있습니다.
     */
    static request(callback?: ((now: number, interval: number) => void), interval?: number): string;
    /**
     *
     * @param id    삭제할 콜백함수의 ID값입니다.
     */
    static cancelRequest(id: string): void;
    protected static update(): void;
}
export default Tick;
