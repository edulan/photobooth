var ClipItem = Marionette.ItemView.extend({
  template: 'clips/item',
  className: 'clip',

  modelEvents: {
    change: 'render',
  },
});

module.exports = ClipItem;
