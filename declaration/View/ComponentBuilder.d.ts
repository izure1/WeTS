import Component from './Component';
import { Reservation } from '../Components/Reservation';
declare class ComponentBuilder {
    private static readonly ReservationMap;
    private data;
    constructor(name: Reservation);
    /**
     *
     * @param name      컴포넌트의 이름입니다.
     */
    setName(name: Reservation): ComponentBuilder;
    /**
     *
     * @param data      컴포넌트의 데이터입니다.
     */
    setData(data: object): ComponentBuilder;
    /**
     * @description     주어진 컴포넌트의 이름과 데이터를 기반으로 새로운 컴포넌트 인스턴스를 생성합니다.
     */
    build(): Component;
}
export default ComponentBuilder;
