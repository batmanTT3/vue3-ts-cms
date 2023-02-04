import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export function formatUtcString(utcString:string,format:string = DATE_TIME_FORMAT){
    return dayjs.utc(utcString).utcOffset(8).format(format)
}

// export function formatTimestamp(timestamp:number,format:string = DATE_TIME_FORMAT){

// }