import Component from './Component'
import ComponentData from './ComponentData'
import { Reservation } from '../Components/Reservation'
import { ReservationMap } from '../Components/ReservationMap'

class ComponentBuilder {
    private static readonly ReservationMap: typeof ReservationMap = ReservationMap
    private data: ComponentData
    
    constructor(name: Reservation) {
        this.data = { name }
    }

    /**
     * 
     * @param name      컴포넌트의 이름입니다.
     */
    setName(name: Reservation): ComponentBuilder {
        this.data.name = name
        return this
    }

    /**
     * 
     * @param data      컴포넌트의 데이터입니다.
     */
    setData(data: object): ComponentBuilder {
        Object.assign(this.data, data)
        return this
    }

    /**
     * @description     주어진 컴포넌트의 이름과 데이터를 기반으로 새로운 컴포넌트 인스턴스를 생성합니다.
     */
    build(): Component {
        const ComponentConstructor: typeof Component = ComponentBuilder.ReservationMap[this.data.name]
        if (!ComponentConstructor) {
            throw `'${this.data.name}' was not exists component name.`
        }
        const ref = new ComponentConstructor(this.data)
        return ref
    }
}

export default ComponentBuilder