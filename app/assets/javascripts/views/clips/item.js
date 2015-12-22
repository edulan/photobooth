var ClipItem = Marionette.ItemView.extend({
  template: 'clips/item',
  className: 'clip-group clip-thumb',

  modelEvents: {
    change: 'render',
  },
});

module.exports = ClipItem;
