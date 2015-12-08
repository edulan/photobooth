var Booth = Backbone.Model.extend({
  urlRoot: "/api/booths",

  idAttribute: "token",
});

module.exports = Booth;
