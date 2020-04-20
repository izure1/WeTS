import { Reservation } from './Reservation';
import Component from '../View/Component';
import ComponentData from '../View/ComponentData';
export default class ComponentInterface extends Component {
    readonly name: Reservation;
    src: string | null;
    muted: boolean;
    loop: boolean;
    playbackRate: number;
    volume: number;
    recaching: number;
    constructor(data: ComponentData);
    /**
     *
     * @param time      오디오를 재생할 시간(ms)위치입니다.
     * @description     오디오를 재생합니다. 매개변수로 시간을 넘기면, 해당 위치에서부터 재생합니다.
     */
    play(time?: number): Promise<void>;
    /**
     *
     * @param time      오디오를 재생할 시간(ms)위치입니다.
     * @description     오디오를 재생합니다. 이미 재생 중일 경우, 재생하지 않습니다. 매개변수로 시간을 넘기면, 해당 위치에서부터 재생합니다.
     */
    playLazy(time?: number): Promise<void>;
    /**
     * @description     오디오가 재생 중인지 여부를 반환합니다.
     */
    isPlaying(): Promise<boolean>;
    /**
     * @description     오디오를 일시정지합니다.
     */
    pause(): Promise<void>;
    /**
     * @description     오디오를 정지합니다.
     */
    stop(): Promise<void>;
}
