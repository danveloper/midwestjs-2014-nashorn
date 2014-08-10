console.log("Loading Error Extensions");

Error._captureStackTrace = Error.captureStackTrace;

Error.captureStackTrace = function(obj) {
    Error._captureStackTrace(obj);
    if (obj.stack.indexOf(']') > 0) {
        obj.stack = obj.stack.substring(obj.stack.indexOf(']')+1);
    }
    var stack = obj.stack.slice(1).split('\n');
    var objs = [];
    for each (s in stack) {
        var parts = s.split(':');
        var file = parts[1];
        var line = parts[2];
        var error = new Error(s);
        error.lineNumber = line;
        error.fileName = file;
        error.columnNumber = 0;
        objs.push(error);
    }
    obj.stack = objs;
};

Error.prototype.getFileName = function() {
    return this.fileName;
};

Error.prototype.getLineNumber = function() {
    return this.lineNumber;
};

Error.prototype.getColumnNumber = function() {
    return this.columnNumber;
};

Error.prototype.isEval = function() {
    return false;
};

Error.prototype.getFunctionName = function() {
    return "";
};