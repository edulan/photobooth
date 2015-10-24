var Clip = require('models/clip');

var Clips = Backbone.Collection.extend({
  url: "api/clips",

  model: Clip,

  comparator: function(model1, model2) {
    var v1 = model1.get('votes');
    var v2 = model2.get('votes');

    return v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
  }
});

module.exports = Clips;
