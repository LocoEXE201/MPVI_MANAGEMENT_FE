import moment from 'moment';

export const YYYY_MMMM_DD = (dateStr: string) => moment(dateStr).format('YYYY, MMMM DD');

export const YYYY_MMMM_DD_Time = (dateStr: string) => moment(dateStr).format('YYYY MMMM DD, HH:mm');

export const DD_MM_YYYY = (dateStr: string) => moment(dateStr).format('DD/MM/YYYY');

export const DD_MM_YYYY_Time = (dateStr: string) => moment(dateStr).format('DD/MM/YYYY, HH:mm');

const formatDate = {
    YYYY_MMMM_DD,
    YYYY_MMMM_DD_Time,
    DD_MM_YYYY,
    DD_MM_YYYY_Time
}

export default formatDate