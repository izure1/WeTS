import Component from './Component.js'
import ComponentBuilder from './ComponentBuilder.js'
import { Reservation } from '../Components/Reservation.js'

class ComponentFactory {
    static create(name: Reservation): Component {
        const builder: ComponentBuilder = new ComponentBuilder(name)
        return builder.setName(name).build()
    }
}

export default ComponentFactory