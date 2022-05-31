import Axios from '../plugin/Axios'

export default {
    retrieveBusInfo(info){
        return Axios().post('/api/timetable', info)
    }
}


