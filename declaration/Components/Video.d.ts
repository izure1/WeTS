import { Reservation } from './Reservation';
import Component from '../View/Component';
import ComponentData from '../View/ComponentData';
export default class ComponentInterface extends Component {
    readonly name: Reservation;
    width: 'auto' | number;
    height: 'auto' | number;
    src: string | null;
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
    loop: boolean;
    playbackRate: number;
    volume: number;
    constructor(data: ComponentData);
    /**
     *
     * @param time      비디오를 재생할 시간(ms)위치입니다.
     * @description     비디오를 재생합니다. 매개변수로 시간을 넘기면, 해당 위치에서 재생합니다.
     */
    play(time?: number): Promise<void>;
    /**
     * @description     비디오 재생을 일지중지합니다.
     */
    pause(): Promise<void>;
}
