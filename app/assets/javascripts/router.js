var Router = Marionette.AppRouter.extend({
  appRoutes: {
    "": "index",
    "clips": "index",
    "clips/new": "new",
    "clips/:id": "show"
  }
});

module.exports = Router;
