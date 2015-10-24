(function(root) {
    PhotoBooth.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "index",
            "clips": "index",
            "clips/new": "create",
            "clips/:id": "show"
        }
    });
})(window);
