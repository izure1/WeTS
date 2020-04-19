import EventEmitter from 'eventemitter3';
import ComponentList from './ComponentList';
import LevelDesign from './LevelDesign';
interface LifeCycle {
    preload: ((dataTransfer: Map<string, any>) => Promise<void>)[];
    start: ((dataTransfer: Map<string, any>) => Promise<void>)[];
    update: ((dataTransfer: Map<string, any>, deltaTime: number) => Promise<void>)[];
    destroy: ((dataTransfer: Map<string, any>) => Promise<void>)[];
    dataTransfer: Map<string, any>;
}
declare class View extends EventEmitter {
    readonly uid: string;
    readonly lifecycle: LifeCycle;
    readonly tags: string[];
    readonly levelDesign: LevelDesign;
    readonly component: ComponentList;
    id: null | string;
    level: string;
    constructor();
    /**
     *
     * @param fn        실행될 콜백 함수입니다.
     * @description     이 인스턴스가 준비 단계에 진입했을 때 콜백 함수를 호출합니다.
     */
    onPreload(fn: (dataTransfer: Map<string, any>) => Promise<void>): View;
    /**
     *
     * @param fn        실행될 콜백 함수입니다.
     * @description     이 인스턴스가 화면에 보여지기 시작할 때 콜백 함수를 호출합니다.
     */
    onStart(fn: (dataTransfer: Map<string, any>) => Promise<void>): View;
    /**
     *
     * @param fn        실행될 콜백 함수입니다.
     * @description     매 프레임마다 콜백 함수를 호출합니다.
     */
    onUpdate(fn: (dataTransfer: Map<string, any>, deltaTime: number) => Promise<void>): View;
    /**
     *
     * @param fn        실행될 콜백 함수입니다.
     * @description     이 인스턴스가 파괴될 때 콜백 함수를 호출합니다.
     */
    onDestroy(fn: (dataTransfer: Map<string, any>) => Promise<void>): View;
    /**
     * @description     onStart 메서드로 등록한 콜백 함수를 호출합니다.
     */
    cycleStart(): void;
    /**
     * @description     onUpdate 메서드로 등록한 콜백 함수를 호출합니다.
     * @returns         매 프레임마다 호출하는 애니메이션프레임의 고유값입니다.
     */
    cycleUpdate(): string;
    /**
     *
     * @param tick      매 프레임마다 호출하는 애니메이션프레임의 고유값입니다. cycleUpdate 메서드의 반환값을 넘기십시오.
     * @description     onDestroy 메서드로 등록한 콜백 함수를 호출합니다.
     */
    cycleDestroy(tick: string): void;
}
export default View;
