import { Reservation } from './Reservation'
import Component from '@/View/Component'
import ComponentData from '@/View/ComponentData'

export default class ComponentInterface extends Component {
    readonly name: Reservation = Reservation.Text
    src: string | null = null
    width: 'auto' | number = 'auto'
    height: 'auto' | number = 'auto'
    fontSize: 'medium' | 'xx-small' | 'x-small' | 'small' | 'large' | 'x-large' | 'xx-large' | 'smaller' | 'larger' | number = 'medium'
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number = 'normal'
    fontFamily: string = 'arial'
    fontStyle: 'normal' | 'italic' | 'oblique' = 'normal'
    lineHeight: 'normal' | number = 'normal'
    letterSpacing: number = 0
    wordSpacing: number = 0
    content: string = ''
    textAlign: 'left' | 'center' | 'right' = 'left'
    borderColor: string = 'transparent'
    color: string = 'black'

    constructor(data: ComponentData) {
        super(data)
    }
}