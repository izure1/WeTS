import EventEmitter from 'eventemitter3';
import ParticleOption from './ParticleOption';
declare class Particle extends EventEmitter implements ParticleOption {
    private naturalWidth;
    private naturalHeight;
    private step;
    src: string;
    start: number;
    end: number;
    duration: number;
    frictionAir: number;
    perspective: number;
    constructor(naturalWidth: number, naturalHeight: number, perspective: number);
    get progress(): number;
    get scale(): number;
    get width(): number;
    get height(): number;
    /**
     *
     * @param deltaTime  이전과 현재 update 메서드를 호출한 사이 간격 시간(ms)입니다.
     */
    update(deltaTime: number): void;
}
export default Particle;
