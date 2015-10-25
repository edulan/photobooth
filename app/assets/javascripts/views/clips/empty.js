var ClipEmpty = Marionette.ItemView.extend({
  tagName: "p",
  className: "text-info text-center message-no-clips",
  template: "clips/empty"
});

module.exports = ClipEmpty;
