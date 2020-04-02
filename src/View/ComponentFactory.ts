import Component from './Component'
import ComponentBuilder from './ComponentBuilder'
import { Reservation } from '../Components/Reservation'

class ComponentFactory {
    static create(name: Reservation): Component {
        const builder: ComponentBuilder = new ComponentBuilder(name)
        return builder.setName(name).build()
    }
}

export default ComponentFactory