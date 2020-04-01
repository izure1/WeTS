import { Reservation } from './Reservation.js'
import Component from '../View/Component.js'
import Children from './Children.js'
import Camera from './Camera.js'
import Transform from './Transform.js'
import Filter from './Filter.js'
import Dataset from './Dataset.js'
import Image from './Image.js'
import Physics from './Physics.js'

type ComponentMap = { [name in Reservation]: typeof Component }
export const ReservationMap: ComponentMap = {
    [Reservation.Children]: Children,
    [Reservation.Camera]: Camera,
    [Reservation.Transform]: Transform,
    [Reservation.Filter]: Filter,
    [Reservation.Dataset]: Dataset,
    [Reservation.Image]: Image,
    [Reservation.Physics]: Physics,
}