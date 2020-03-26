import { Reservation } from './Reservation.js'
import Component from '../View/Component.js'
import Children from './Children.js'
import Camera from './Camera.js'
import Transform from './Transform.js'
import Filter from './Filter.js'

type ComponentMap = { [name in Reservation]: typeof Component }
export const ReservationMap: ComponentMap = {
    [Reservation.Children]: Children,
    [Reservation.Camera]: Camera,
    [Reservation.Transform]: Transform,
    [Reservation.Filter]: Filter,
}