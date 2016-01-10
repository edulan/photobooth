var ClipShowMore = Marionette.ItemView.extend({
  template: 'clips/show-more',

  ui: {
    alert: '.js-alert',
  },

  events: {
    'click @ui.alert': 'onClick',
  },

  viewOptions: ['stream'],

  initialize: function(options) {
    this.mergeOptions(options, this.viewOptions);

    this.shadowCollection = new this.collection.constructor([], {
      model: this.collection.model,
    });

    this.listenTo(this.shadowCollection, 'add change reset', this.render);
    this.listenTo(this.stream, 'add', this.onAdd);
    this.listenTo(this.stream, 'change', this.onChange);
  },

  onAdd: function(model) {
    this.shadowCollection.add(model);
  },

  onChange: function(model) {
    this.collection.set([model], {remove: false});
  },

  onClick: function() {
    this.collection.set(this.shadowCollection.slice(), {remove: false});
    // Empty shadow collection after models have been merged to global collection
    this.shadowCollection.reset();
  },

  serializeData: function() {
    return  {
      length: this.shadowCollection.length,
      isHidden: this.shadowCollection.isEmpty(),
    };
  },
});

module.exports = ClipShowMore;
