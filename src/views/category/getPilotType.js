import axios from 'axios';
import { mediaList, toolList, gptList, pilotList } from "./pilot.vue";

export const getPilotType = () => {
axios.get('/back/pilot/getList').then(res => {
console.log('res', res.data.result);
mediaList.value = res.data.result['媒体'];
toolList.value = res.data.result['工具'];
gptList.value = res.data.result['ChatGPT'];
// pilotList.value = res.data.result
// console.log("11", pilotList.value)
// Object.entries(res.data.result).forEach(item => console.log(item[0], item[1]))
// Object.entries(res.data.result).forEach(item => pilotList.set(item[0], item[1]))
console.log("p", pilotList);

// for((k, v) in pilotList.value) {
//   console.log(k, v)
// }
// pilotList.value.push()
// console.log(response)
}).catch(err => {
console.log('err', err);
});
};
