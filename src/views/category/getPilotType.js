import axios from 'axios';
import {pilotList} from "./pilot.vue";

export const getPilotType = () => {
    axios.get('/back/pilot/getList').then(res => {
    }).catch(err => {
        console.log('err', err);
    });
};
