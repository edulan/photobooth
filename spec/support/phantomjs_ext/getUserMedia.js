navigator.getUserMedia = function(constraints, successCallback, errorCallback) {
    var stream = {
        stop: function() {}
    };

    successCallback(stream);
};

// WARNING: Dirty HACK!
// This is a smell that we should probably use a wrapper
// library for handling this scenario.
// Support HTMLVideoElement extending HTMLElement prototype
window.HTMLElement.prototype.play = function() {};
window.HTMLElement.prototype.pause = function() {};