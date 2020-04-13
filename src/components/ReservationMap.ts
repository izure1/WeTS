import { Reservation } from './Reservation'
import Component from '../View/Component'
import Children from './Children'
import Camera from './Camera'
import Transform from './Transform'
import Filter from './Filter'
import Dataset from './Dataset'
import Image from './Image'
import Physics from './Physics'
import Rect from './Rect'
import Text from './Text'
import Html from './Html'
import Video from './Video'
import Audio from './Audio'
import Particle from './Particle'

type ComponentMap = { [name in Reservation]: typeof Component }
export const ReservationMap: ComponentMap = {
    [Reservation.Children]: Children,
    [Reservation.Camera]: Camera,
    [Reservation.Transform]: Transform,
    [Reservation.Filter]: Filter,
    [Reservation.Dataset]: Dataset,
    [Reservation.Image]: Image,
    [Reservation.Physics]: Physics,
    [Reservation.Rect]: Rect,
    [Reservation.Text]: Text,
    [Reservation.Html]: Html,
    [Reservation.Video]: Video,
    [Reservation.Audio]: Audio,
    [Reservation.Particle]: Particle,
}