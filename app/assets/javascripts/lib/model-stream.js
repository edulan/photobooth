function ModelStream(options) {
  var url = options.url;
  var model = options.model;

  if (!model) {
    throw new Error('You must specify a model class');
  }

  var source = this.source = new EventSource(url);
  var emitter = this;

  source.addEventListener('open', function (event) {
    emitter.trigger('open');
  });
  source.addEventListener('error', function (event) {
    emitter.trigger('error', event);
  });
  source.addEventListener('close', function (event) {
    emitter.trigger('close');
  });

  source.addEventListener('add', function (event) {
    var attributes = {};

    try {
      attributes = JSON.parse(event.data);
    } catch (e) {
      return;
    }

    emitter.trigger('add', new model(attributes));
  });
  // TODO: DRY!!!
  source.addEventListener('change', function (event) {
    var attributes = {};

    try {
      attributes = JSON.parse(event.data);
    } catch (e) {
      return;
    }

    emitter.trigger('change', new model(attributes));
  });
}

ModelStream.prototype.close = function () {
  if (this.source && this.source.readyState !== EventSource.CLOSED) {
    this.source.close();
  }
};

_.extend(ModelStream.prototype, Backbone.Events);

module.exports = ModelStream;
