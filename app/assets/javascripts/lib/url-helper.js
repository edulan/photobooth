var UrlHelper = {
  modelUrl: function(model, params) {
    var baseUrl = _.result(model, 'urlRoot');

    if (!params) {
      return baseUrl;
    }

    return baseUrl + '?' + $.param(params);
  },

  clipsStreamUrl: function (model) {
    return '/clips/stream?booth_id=' + model.id;
  },
};

module.exports = UrlHelper;
