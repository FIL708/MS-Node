const TYPES = {
    INFO: "\x1b[34m",
    SUCCESS: "\x1b[32m",
    WARNING: "\x1b[33m",
    ERROR: "\x1b[31m",
};

const log = (message, type) => {
    switch (type.toUpperCase()) {
        case "INFO":
            console.log(`${TYPES.INFO}█ INFO █ ${message} \x1b[0m`);
            break;
        case "SUCCESS":
            console.log(`${TYPES.SUCCESS}█ SUCC █ ${message} \x1b[0m`);
            break;
        case "WARNING":
            console.log(`${TYPES.WARNING}█ WARN █ ${message} \x1b[0m`);
            break;
        case "ERROR":
            if (message instanceof Error) {
                console.log(`${TYPES.ERROR}█ ERR █ [${message.stack}] \x1b[0m`);
            } else {
                console.log(`${TYPES.ERROR}█ ERR █ ${message} \x1b[0m`);
            }

            break;

        default:
            console.log(message);
            break;
    }
};

module.exports = log;
