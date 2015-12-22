var ClipItem = require('views/clips/item');
var ClipEmpty = require('views/clips/empty');

var ClipList = Marionette.CollectionView.extend({
  className: 'clips',
  childView: ClipItem,
  emptyView: ClipEmpty,

  serializeData: function() {
    return  {
      name: this.model.get('name'),
    };
  },
});

module.exports = ClipList;
