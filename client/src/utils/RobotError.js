
class RobotError extends Error {

    constructor(message, fields = null) {
        super(message);
        this.fields = fields;

    }
}

export default RobotError;