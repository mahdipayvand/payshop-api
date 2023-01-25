exports.failure = (message) => ({ successful: false, message: message || "Something went wrong!" });

exports.successful = (message, data) => ({ successful: true, message: message || undefined, data });
