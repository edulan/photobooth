var UrlHelper = {
  modelUrl: function(model, params) {
    var baseUrl = _.result(model, 'urlRoot');

    if (!params) {
      return baseUrl;
    }

    return baseUrl + '?' + $.param(params);
  },
};

module.exports = UrlHelper;
