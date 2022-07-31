
const addDate = (addTime) => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + parseInt(addTime)); // timestamp
    return new Date(now); // Date object

}

const compareDate = (a, b) => {
    console.log(a, b);
    return a.getTime() >= b.getTime();

}

module.exports = {
    addDate,
    compareDate
}