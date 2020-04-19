import { Reservation } from './Reservation';
import Component from '../View/Component';
import ComponentData from '@/View/ComponentData';
export default class ComponentInterface extends Component {
    readonly name: Reservation;
    friction: number;
    frictionAir: number;
    frictionStatic: number;
    restitution: number;
    isStatic: boolean;
    isSensor: boolean;
    fixedRotation: boolean;
    readonly colliders: string[];
    constructor(data: ComponentData);
    /**
     *
     * @param x         x좌표로 가할 힘의 세기
     * @param y         y좌표로 가할 힘의 세기
     * @description     이 객체에 x, y 좌표로 물리력을 가합니다.
     */
    applyForce(x: number, y: number): void;
    /**
     *
     * @param x         x좌표로 가할 속도
     * @param y         y좌표로 가할 속도
     * @description     이 객체에 x, y, 좌표로 속도를 지정합니다. 이 속도는 일시적인 것이므로, 꾸준히 가하지 않는다면 멈출 것입니다.
     */
    setVelocity(x: number, y: number): void;
    /**
     *
     * @param velocity  회전할 속도
     * @description     이 객체에 회전할 속도를 지정합니다. 이 속도는 일시적인 것이므로, 꾸준히 가하지 않는다면 멈출 것입니다.
     */
    setAngularVelocity(velocity: number): void;
    update(): void;
}
