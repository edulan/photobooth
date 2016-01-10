var ClipShowMore = require('views/clips/show-more');
var ClipList = require('views/clips/list');

var ClipTimeline = Marionette.LayoutView.extend({
  template: 'clips/index',

  regions: {
    results: '.js-clip-results',
    list: '.js-clip-list',
  },

  viewOptions: ['stream'],

  initialize: function (options) {
    this.mergeOptions(options, this.viewOptions);
  },

  onShow: function () {
    var showMoreView = new ClipShowMore({
      stream: this.stream,
      collection: this.collection,
    });
    var listView = new ClipList({
      model: this.model,
      collection: this.collection,
    });

    // Force collection sorting to reflect like updates
    this.collection.sort();

    this.results.show(showMoreView);
    this.list.show(listView);
  },
});

module.exports = ClipTimeline;
