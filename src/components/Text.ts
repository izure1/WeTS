import { Reservation } from './Reservation'
import Component from '@/View/Component'
import ComponentData from '@/View/ComponentData'

export default class ComponentInterface extends Component {
    readonly name: Reservation = Reservation.Text
    width: 'auto' | number = 'auto'
    height: 'auto' | number = 'auto'
    fontSize: number = 25
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number = 400
    fontFamily: string = 'arial'
    fontStyle: 'normal' | 'italic' | 'oblique' = 'normal'
    textDecoration: 'none' | 'line-through' | 'overline' | 'underline' = 'none'
    lineHeight: 'normal' | number = 'normal'
    letterSpacing: number = 0
    wordSpacing: number = 0
    whiteSpace: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' = 'normal'
    textAlign: 'left' | 'center' | 'right' = 'left'
    borderColor: string = 'transparent'
    color: string = 'black'
    content: string = ''

    constructor(data: ComponentData) {
        super(data)
    }
}