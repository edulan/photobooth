function NullStream() {}

NullStream.prototype.close = function () {};

_.extend(NullStream.prototype, Backbone.Events);

module.exports = NullStream;
