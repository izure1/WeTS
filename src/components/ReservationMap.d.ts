import { Reservation } from './Reservation';
import Component from '../View/Component';
declare type ComponentMap = {
    [name in Reservation]: typeof Component;
};
export declare const ReservationMap: ComponentMap;
export {};
