
import moment from 'moment';

const addDate = (addTime) => {
    const now = new Date();
    return new Date(now.getTime() + addTime * 1000);


}

const compareDate = (a, b) => {
    if (!b) {
        return false;
    }
    return a.getTime() >= b.getTime();
}

const timeLeft = (time) => {
    const smth = moment(time);
    return smth.diff(new Date());
}


export {
    addDate,
    compareDate,
    timeLeft
}