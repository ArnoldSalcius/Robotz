
class ErrorResponse extends Error {

    constructor(message, statusCode, fields = null) {
        super(message);
        this.statusCode = statusCode;
        if (fields) {
            this.fields = fields;
        }
    }
}


module.exports = ErrorResponse;