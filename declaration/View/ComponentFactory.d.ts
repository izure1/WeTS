import Component from './Component';
import { Reservation } from '../Components/Reservation';
declare class ComponentFactory {
    static create(name: Reservation): Component;
}
export default ComponentFactory;
