var Root = Marionette.LayoutView.extend({
  template: 'layout',

  el: 'body',

  regions: {
    content: '.js-content'
  }
});

module.exports = Root;
