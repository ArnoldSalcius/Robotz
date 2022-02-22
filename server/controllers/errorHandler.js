

const errorHandler = (err, req, res, next) => {
    console.log('Handler is working');
    console.log(err);
}



module.exports = errorHandler