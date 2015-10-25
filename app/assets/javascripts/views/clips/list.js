var ClipItem = require('views/clips/item');
var ClipEmpty = require('views/clips/empty');

var ClipList = Marionette.CompositeView.extend({
  template: "clips/index",
  className: "clips",
  childView: ClipItem,
  childViewContainer: ".row-clip",
  emptyView: ClipEmpty
});

module.exports = ClipList;
