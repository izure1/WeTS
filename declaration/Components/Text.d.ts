import { Reservation } from './Reservation';
import Component from '../View/Component';
import ComponentData from '../View/ComponentData';
export default class ComponentInterface extends Component {
    readonly name: Reservation;
    width: 'auto' | number;
    height: 'auto' | number;
    fontSize: number;
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    fontFamily: string;
    fontStyle: 'normal' | 'italic' | 'oblique';
    textDecoration: 'none' | 'line-through' | 'overline' | 'underline';
    lineHeight: 'normal' | number;
    letterSpacing: number;
    wordSpacing: number;
    whiteSpace: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
    textAlign: 'left' | 'center' | 'right';
    borderColor: string;
    color: string;
    content: string;
    constructor(data: ComponentData);
}
