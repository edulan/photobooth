var Clip = require('models/clip');

var Clips = Backbone.Collection.extend({
  url: '/api/clips',

  model: Clip,

  comparator: function(model1, model2) {
    var d1 = model1.get('created_at');
    var d2 = model2.get('created_at');

    if (d2 > d1) {
      return 1;
    } else if (d2 < d1) {
      return -1;
    }

    return 0;
  },
});

module.exports = Clips;
